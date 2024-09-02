<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	https://codeigniter.com/userguide3/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There are three reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router which controller/method to use if those
| provided in the URL cannot be matched to a valid route.
|
|	$route['translate_uri_dashes'] = FALSE;
|
| This is not exactly a route, but allows you to automatically route
| controller and method names that contain dashes. '-' isn't a valid
| class or method name character, so it requires translation.
| When you set this option to TRUE, it will replace ALL dashes in the
| controller and method URI segments.
|
| Examples:	my-controller/index	-> my_controller/index
|		my-controller/my-method	-> my_controller/my_method
*/





//this is the how page.. if user write the limk www.api.com he will be here
$route['default_controller'] = 'pages/view';
$route['ar'] = 'pages/ar';



$route['search'] = 'returner/search';

//this is the route for the all items fetch.. followed by limit/offset
$route['search/all'] = 'returner/get_all';
$route['sfgilsdf_uwedva'] = 'sfgilsdf_uwedva/index';
$route['sfgilsdf_uwedva/add_perfume'] = 'sfgilsdf_uwedva/add_perfume';
$route['sfgilsdf_uwedva/add_perfume'] = 'sfgilsdf_uwedva/add_perfume';
$route['sfgilsdf_uwedva/edit_perfume/(:num)'] = 'sfgilsdf_uwedva/edit_perfume/$1';
$route['sfgilsdf_uwedva/update_perfume/(:num)'] = 'sfgilsdf_uwedva/update_perfume/$1';
$route['sfgilsdf_uwedva/delete_perfume/(:num)'] = 'sfgilsdf_uwedva/delete_perfume/$1';
$route['sfgilsdf_uwedva/add_note'] = 'sfgilsdf_uwedva/add_note';
$route['sfgilsdf_uwedva/add_brand'] = 'sfgilsdf_uwedva/add_brand';
$route['get_all_brands'] = 'returner/get_brands';
$route['get_all_notes'] = 'returner/get_notes';
//this is the search by type/name/limit/offset
//usage example: api.com/search/p.id/1/10/0 will show the perfume with id no.1.. 10 items per page and from the first item
$route['search/(:any)/(:any)/(:num)/(:num)'] = 'returner/search/$1/$2/$3/$4';
//whatever is not matched in the above routes will be shown as a page.. if it is not there.. error404 will appear.. check the mentioned function if u need
$route['(:any)'] = 'pages/view';






$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;
