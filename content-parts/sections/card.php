<?php
/**
 * am I on holiday?
 */
$is_holiday = false;

/**
 * The end date of the holiday
 */
$holiday_end_date = 20180826;

$activity = array(
	'holiday' => array(
		'label'       => '<span class="label label-resume">En congé</span>',
		'description' => '<span class="icon icon-calendar"></span> jusqu’au 25 août 2018'
	),
	'work'    => array(
		'en train de coder',
		'en train d\'écrire mes tâches Gulp',
		'en train coder un site sous Wordpress',
		'en train d\'écrire du HTML',
		'en train coder un site CodeIgniter',
		'au téléphone',
		'en train d\'éxécuter des requêtes SQL sur une BDD',
		'en train de réaliser un devis',
		'en rendez-vous client',
		'en train réaliser une maquette html responsive',
		'en train prendre un thé',
		"en train d\'écrire une feuille de style CSS",
		"en train de rédiger une réponse à un appel d'offre",
		'en train d\'écrire du PHP',
		'en train prendre un café️',
		'en train de faire un peu de prospection',
        'en train de reprendre le développement d\'un autre développeur...'
	)
);

?>
<section id="card" class="resume-sectiom css-animation-element css-slide-up">
    <div id="personal-infos">
        <div class="row">
            <div class="col-sm-5">
                <div id="photo">
                    <img src="dist/assets/img/aurelien-chappard.jpg?v=2" class="img-responsive center-block" alt="Photo portrait d'Aurélien Chappard">
                </div>
            </div>
            <div class="col-sm-7">
                <div id="wrapper-info">
                    <p>Bonjour</p>
                    <h1><span>Je suis</span> Aurélien Chappard</h1>
                    <h2>Développeur Web - Wordpress - Codeigniter - PHP <span class="sr-only">sur Lyon</span></h2>
                    <hr>
                    <dl class="dl-horizontal">
                        <dt>Age</dt>
                        <dd class="text-muted"><?php echo calculer_age('1983-06-11') ?> ans</dd>
                        <dt>Adresse</dt>
                        <dd class="text-muted">c/o Ecoworking - 27 rue romarin 69007 LYON</dd>
                        <dt>Téléphone</dt>
                        <dd class="text-muted">06 86 49 67 94</dd>
                        <dt>Freelance</dt>
                        <dd class="text-muted">depuis Juillet 2011</dd>
	                    <?php echo current_activity($is_holiday, $holiday_end_date, $activity);?>
                    </dl>
                </div>
            </div>
        </div>
    </div>
    <div class="social-menu">
        <div class="row">
            <div class="col-sm-12">
                <ul class="list-inline list-unstyled text-center">
                    <li><div class="css-animation-element css-slide-left css-with-delay-06"><a target="_blank" href="https://twitter.com/achappard"><span class="icon icon-twitter"></span><span class="sr-only">Mon compte Twitter : @achappard</span></a></div></li>
                    <li><div class="css-animation-element css-slide-left css-with-delay-04"><a target="_blank" href="https://www.linkedin.com/in/aurelienchappard/"><span class="icon icon-linkedin"></span><span class="sr-only">Mon profil LinkedIn: @aurelienchappard</span></a></div></li>
                    <li><div class="css-animation-element css-fade"><a target="_blank" href="https://www.deefuse.fr/"><span class="icon icon-deefuse"></span><span class="sr-only">Mon site professionnel : Deefuse</span></a></div></li>
                    <li><div class="css-animation-element css-slide-right css-with-delay-04"><a target="_blank" href="https://github.com/achappard/"><span class="icon icon-github"></span><span class="sr-only">Mon compte Github : @achappard</span></a></div></li>
                    <li><div class="css-animation-element css-slide-right css-with-delay-06"><a target="_blank" href="https://www.facebook.com/achappard"><span class="icon icon-facebook"></span><span class="sr-only">Mon profil FaceBook: @achappard</span></a></div></li>
                </ul>
            </div>
        </div>
    </div>
</section>