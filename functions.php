<?php

/**
 * Calculation of the exact age according to the date of birth passed as parameter
 * @param $date
 *
 * @return false|string
 */
function calculer_age($date){
	$dna = strtotime($date);
	$now = time();

	$age = date('Y',$now)-date('Y',$dna);
	if(strcmp(date('md', $dna),date('md', $now))>0){
		$age--;
	}
	return $age;
}





setlocale(LC_TIME, "fr_FR.UTF8");
function current_activity($is_holiday, $holiday_end_date, $activity){
	if($is_holiday){
		return sprintf('<dt>%s</dt><dd class="text-muted with-label"><span class="icon icon-calendar"></span> jusqu\'au %s</dd>', $activity['holiday']['label'], strftime('%d %B %Y', strtotime($holiday_end_date)));
	}
	else{
		//What day is it
		// 1 for monday, .. 7 = sunday
		$current_day  = date('N');
		if($current_day >= 6 ){
			return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en week-end');
		}else{
			$current_hour = date('G');
			if($current_hour <= 6 || $current_hour >= 23){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train de dormir');
			}elseif ($current_hour == 7){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train de petit-déjeuner');
			}
			elseif ($current_hour == 8){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train d\'aller au boulot‍️');
			}
			elseif ($current_hour == 18){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train de rentrer du boulot‍️');
			}elseif ($current_hour == 19){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train de manger en famille');
			}elseif ($current_hour >= 20 && $current_hour <= 22){
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en train de lire un bon polar');
			}
			elseif ($current_hour == 12 || $current_hour == 13){

				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', 'en pause dej');
			}else{
				// nb seconds
				$time_en_minutes = time() / 60 / 45; // Change msg every 45 minutes
				$nb_activities = count($activity['work']);
				return sprintf('<dt>%s</dt><dd class="text-muted">%s</dd>', 'Actuellement', $activity['work'][$time_en_minutes % $nb_activities]);
			}
		}


	}
}