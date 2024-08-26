<?php

// class Returner extends CI_Controller
// {
    // public function search($a=FALSE,$b=FALSE,$c=FALSE,$d=FALSE)
    // {
        // die('You are calling the search method of the Returner controller');
        // Use the parameters to query your database.
        // $data['s'] = $this->My_model->get_all($a, $b, $c, $d);
        
        // Set the content type to JSON for the response
        // print_r ($data['s']);
        // return json_encode($data);
             
    // }
// }


class Returner extends CI_Controller
{
    public function search($type, $name, $limit, $offset)
    {
        // Use the parameters to query your database.
        $data = $this->My_model->get_all($type, $name, $limit, $offset);
        // print_r ($data);
        
        // Set the content type to JSON for the response
        $this->output
             ->set_content_type('application/json')
             ->set_output(json_encode($data));
    }

    public function get_all()
    {
        // Use the parameters to query your database.
        $data = $this->My_model->get_all();
        // print_r ($data);
        
        // Set the content type to JSON for the response
        $this->output
             ->set_content_type('application/json')
             ->set_output(json_encode($data));
    }
    public function get_brands(){
                // Use the parameters to query your database.
                $data = $this->My_model->get_brands();
                // print_r ($data);
                
                // Set the content type to JSON for the response
                $this->output
                     ->set_content_type('application/json')
                     ->set_output(json_encode($data));
    }
    public function get_notes(){
                // Use the parameters to query your database.
                $data = $this->My_model->get_notes();
                // print_r ($data);
                
                // Set the content type to JSON for the response
                $this->output
                     ->set_content_type('application/json')
                     ->set_output(json_encode($data));
    }











}

