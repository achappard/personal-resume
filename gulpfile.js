/* jshint node: true */
'use strict';

/**
 * Usage général :
 *
 *  - tâche "gulp" : fichiers compilés dans "/dist" (ni minifiés ni concaténés).
 *    Le client peut modifier, améliorer et mettre en prod lui-même.
 *
 *  - tâche "gulp --prod" : fichiers compilés dans "/dist" (minifiés, concaténés,
 *    optimisés, etc.). Le client utilise tel quel.
 */


/**
 * Chargement et initialisation des composants utilisés
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    argv = require('yargs').argv,
    del = require('del');

/**
 * Tâche (et packages) de production si ajout de l'argument "--prod" (seulement à la fin ?)
 */
var isProduction = argv.prod;
if (isProduction) {
    console.log("VOUS ÊTES EN ENVIRONNEMENT DE PRODUCTION !");
}

var browserSync = require('browser-sync').create();


/**
 * Configuration générale du projet et des composants utilisés
 */
var project = {
    name: 'resume_aurelienchappard', // nom du projet, utilisé notamment pour le fichier ZIP
    url: 'http://www.aurelienchappard.test', // url du projet, utilisée par browserSync en mode proxy
    zip: {
        namespace: 'deefuse', // préfixe du fichier ZIP
    },
    plugins: { // activation ou désactivation de certains plugins à la carte
        browserSync: {
            status: true, // utilisation du plugin browserSync lors du Watch ?
            proxyMode: true, // utilisation du plugin browserSync en mode proxy (si false en mode standalone)
            ghostMode: {
                clicks : true,
                scroll : true,
                location : true,
                forms : true,
            },
            open: false,
            notify: true
        },
    },
    configuration: { // configuration des différents composants de ce projet
        // Browserslist : chaîne des navigateurs supportés, paramètrage pour Autoprefixer (annoncé : IE11+, last Chr/Fx/Edge/Opera et iOS 9+, Android 5+ ; ici c'est plus large)
        //  ⇒ Couverture (mondiale, pas française) de 94,73% (mai 2017) d'après
        //  ⇒ http://browserl.ist/?q=%3E+1%25%2C+last+2+versions%2C+IE+%3E%3D+10%2C+Edge+%3E%3D+12%2C++Chrome+%3E%3D+42%2C++Firefox+%3E%3D+42%2C+Firefox+ESR%2C++Safari+%3E%3D+8%2C++ios_saf+%3E%3D+8%2C++Android+%3E%3D+4.4
        //  ⇒ http://browserl.ist et > 1%, last 2 versions, IE >= 10, Edge >= 12,  Chrome >= 42,  Firefox >= 42, Firefox ESR,  Safari >= 8,  ios_saf >= 8,  Android >= 4.4
        browsersList: [
            '> 1%',
            'last 2 versions',
            'IE >= 10', 'Edge >= 12',
            'Chrome >= 42',
            'Firefox >= 42', 'Firefox ESR',
            'Safari >= 8',
            'ios_saf >= 8',
            'Android >= 4.4'],
        cssbeautify: {
            indent: '  ',
        },
        imagemin: {
            svgoPlugins: [
                {
                    removeViewBox: false,
                }, {
                    cleanupIDs: false,
                },
            ],
        },
    },
};

/**
 * Tâche de gestion des erreurs à la volée
 */
var onError = {
    errorHandler: function (err) {
        console.log(err);
        this.emit('end');
    }
};

/**
 * Chemins vers les ressources ciblées
 */
var paths = {
    root: './', // dossier actuel
    src: './src/', // dossier de travail
    dest: './dist/', // dossier destiné à la livraison
    vendors: './node_modules/', // dossier des dépendances du projet
    assets: 'assets/',
    styles: {
        root: 'assets/css/', // fichier contenant les fichiers CSS & Sass
        css: {
            mainFile: 'assets/css/styles.css', // fichier CSS principal
            files: 'assets/css/*.css', // cible tous les fichiers CSS
        },
        sass: {
            mainFile: 'assets/css/styles.scss', // fichier Sass principal
            styleguideFile: 'assets/css/styleguide.scss', // fichier Sass spécifique au Styleguide
            files: 'assets/css/{,*/}*.scss', // fichiers Sass à surveiller (css/ et tous ses sous-répertoires)
        },
    },
    scripts: {
        root: 'assets/js/', // dossier contenant les fichiers JavaScript
        files: 'assets/js/*.js', // fichiers JavaScript (hors vendor)
        mainFile: 'app.min.js', // nom du fichier JS après concaténation
    },
    php : {
        files: './**/*.php',
    },
    fonts: 'assets/css/fonts/', // fichiers typographiques à copier,
    images: 'assets/{,css/}img/{,*/}*.{png,jpg,jpeg,gif,svg}', // fichiers images à compresser
    misc: '*.{ico,htaccess,txt}', // fichiers divers à copier
    maps: '/', // fichiers provenant de sourcemaps
};
/**
 * Ressources JavaScript utilisées par ce projet (vendors + scripts JS spécifiques)
 */
var jsFiles = [
    paths.vendors + 'jquery/dist/jquery.min.js',
    paths.vendors + 'bootstrap-sass/assets/javascripts/bootstrap.min.js',
    paths.vendors + 'responsive-toolkit/dist/bootstrap-toolkit.min.js',


    // paths.vendors + 'styledown-skins/dist/Default/styleguide.min.js',
    // paths.vendors + 'swiper/dist/js/swiper.min.js',
    paths.src + paths.scripts.files,
];

/* ------------------------------------------------
 * Tâches CSS
 * ------------------------------------------------
 */
gulp.task('css:main', function () {
    return gulp.src(paths.src + paths.styles.sass.mainFile)
        .pipe($.plumber(onError))
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.csscomb())
        .pipe($.cssbeautify(project.configuration.cssbeautify))
        .pipe($.autoprefixer( {browsers: project.configuration.browsersList} ))
        // En dév, on évite d'écrire 2 fois le même fichier (ni renommage ni CSSO en dév et pourtant on écrit du CSS à 2 reprises… identique avec le même nom)
        // En env. de prod, on écrit une CSS non-minifiée puis avec le suffixe .min.css une CSS minifiée
        .pipe($.if(!isProduction, gulp.dest(paths.dest + paths.styles.root)))
        .pipe($.if(isProduction, $.rename({suffix: '.min'})))
        .pipe($.if(isProduction, $.csso()))
        // En env de prod, pas de sourcemaps. En dév, les sourcemaps concernent la CSS non minifiée
        .pipe($.if(!isProduction, $.sourcemaps.write(paths.maps)))
        .pipe(gulp.dest(paths.dest + paths.styles.root))
        .pipe($.if(!isProduction, browserSync.stream()));
});
gulp.task('css', ['css:main']);

/* ------------------------------------------------
 * Tâches JS : copie des fichiers JS et vendor  (+ concat et uglify dans global.min.js si prod)
 */
gulp.task('js:main', function () {
    return gulp.src(jsFiles)
        .pipe($.plumber(onError))
        .pipe(gulp.dest(paths.dest + paths.scripts.root))
        .pipe($.if(isProduction, $.concat(paths.scripts.mainFile)))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest(paths.dest + paths.scripts.root));
});

gulp.task('js:check_js_syntax', function () {
    return gulp.src(paths.src + paths.scripts.files)
        .pipe($.jshint())
        .pipe($.jshint.reporter('default'));
});
gulp.task('js', ['js:check_js_syntax','js:main']);


// Tâche IMG : optimisation des images
gulp.task('img', function () {
    return gulp.src(paths.src + paths.images)
        .pipe($.changed(paths.dest + paths.assets))
        .pipe($.imagemin(project.configuration.imagemin))
        .pipe(gulp.dest(paths.dest + paths.assets));
});

// Tâche FONTS : copie des fichiers typographiques
gulp.task('fonts', function () {
    return gulp.src(paths.src + paths.fonts + '**/*')
        .pipe($.changed(paths.dest + paths.fonts))
        .pipe(gulp.dest(paths.dest + paths.fonts));
});

// Tâche MISC : copie des fichiers divers
gulp.task('misc', function () {
    var dottedFiles = { dot: true };
    return gulp.src(paths.src + paths.misc, dottedFiles)
        .pipe($.changed(paths.dest))
        .pipe(gulp.dest(paths.dest));
});

// Tâche CLEAN : supprime les fichiers CSS et JavaScript inutiles en production
gulp.task('clean', function () {
    return del([
        paths.dest + paths.scripts.files, // on supprime tous les fichiers JS de production
        paths.dest + paths.styles.css.files, // on supprime tous les fichiers CSS de production
        '!' + paths.dest + paths.scripts.root + paths.scripts.mainFile, // sauf les JS concaténés finaux
        '!' + paths.dest + paths.styles.root + 'styles.min.css', // sauf les CSS concaténés finaux
    ]);
});


/* ----------------------------------
 * Tâches principales : récapitulatif
 * ----------------------------------
 */
gulp.task('build', ['css', 'js', 'fonts', 'img', 'misc']);



// Tâche WATCH : surveillance Sass, HTML et PHP
gulp.task('watch', function () {
    if (project.plugins.browserSync.status === true) {
        console.log('Lancement de browserSync');
        var browserSyncConf; // variable contenant la configuration de browserSync
        if (project.plugins.browserSync.proxyMode === true) {
            // initialisation du mode proxy si demandé
            browserSyncConf = {
                proxy: project.url,
            };
        } else {
            // sinon on initialise le mode standalone
            browserSyncConf = {
                /* startPath: "url/index.html", */
                server: {
                    baseDir: paths.dest,
                }
            };
        }
        browserSyncConf.ghostMode = project.plugins.browserSync.ghostMode;
        browserSyncConf.open =  project.plugins.browserSync.open;
        browserSyncConf.notify =  project.plugins.browserSync.notify;

        // on initialise le plugin browserSync
        browserSync.init(browserSyncConf);
    }



    // Watch des _partials Scss, du code HTML, du JS
     console.log(paths.styles.sass.files);
    console.log(paths.src);
    
    
    gulp.watch([paths.styles.sass.files], {cwd: paths.src}, ['css']);
    gulp.watch([paths.scripts.files], {cwd: paths.src}, ['js', browserSync.reload]);
    gulp.watch([paths.php.files]).on("change", browserSync.reload);
});



// Tâche par défaut
gulp.task('default', ['build']);