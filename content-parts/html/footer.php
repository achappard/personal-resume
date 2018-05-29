<?php if ( ENVIRONMENT === "development" ) : ?>
	<script src="dist/assets/js/jquery.min.js"></script>
	<script src="dist/assets/js/bootstrap.min.js"></script>
	<!--<script src="dist/assets/js/bootstrap-toolkit.min.js"></script>-->
	<script src="dist/assets/js/app.js"></script>
<?php else : ?>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	<!--<script src="dist/assets/js/bootstrap-toolkit.min.js"></script>-->
	<script src="dist/assets/js/app.min.js"></script>
<?php endif; ?>
</body>
</html>