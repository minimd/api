<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Perfume_model');
    }

    public function add_perfume() {
        $data['brands'] = $this->Perfume_model->get_brands();
        $data['notes'] = $this->Perfume_model->get_notes();
        $this->load->view('admin/add_perfume',$data);
    }

    public function save_perfume() {
        if ($this->input->method() === 'post') {
            // Handle file upload
            $config['upload_path'] = './assets/perfumes/';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size'] = 5120; // 5MB
            $config['file_name'] = uniqid(); // Generate a unique file name
    
            $this->load->library('upload', $config);
    
            if (!$this->upload->do_upload('image')) {
                // If there is an error during upload
                $error = $this->upload->display_errors();
                
                redirect('admin/add_perfume');
            } else {
                // Upload successful
                $upload_data = $this->upload->data();
                $image_url = 'assets/perfumes/' . $upload_data['file_name'];
    
                // Prepare data for insertion
                $perfume_data = array(
                    'name' => $this->input->post('name') ?: NULL,
                    'arabic_name' => $this->input->post('arabic_name') ?: NULL,
                    'gender' => $this->input->post('gender') ?: NULL,
                    'brand_id' => $this->input->post('brand') ?: NULL,
                    'perfumer' => $this->input->post('perfumer') ?: NULL,
                    'size' => $this->input->post('size') ?: NULL,
                    'price' => $this->input->post('price') ?: NULL,
                    'new_price' => $this->input->post('new_price') ?: NULL,
                    'size_2nd' => $this->input->post('size_2nd') ?: NULL,
                    'price_2nd' => $this->input->post('price_2nd') ?: NULL,
                    'new_price_2nd' => $this->input->post('new_price_2nd') ?: NULL,
                    'description' => $this->input->post('description') ?: NULL,
                    'tag' => $this->input->post('tag') ?: NULL,
                    'image_url' => $image_url,
                    'top_notes' => $this->input->post('top_notes') ?: NULL,
                    'middle_notes' => $this->input->post('middle_notes') ?: NULL,
                    'base_notes' => $this->input->post('base_notes') ?: NULL,
                    'all_notes' => $this->input->post('all_notes') ?: NULL,
                    'status' => $this->input->post('status') ?: NULL,
                    'box' => $this->input->post('box') ?: NULL,
                );
    
                // Save to the database
                if ($this->Perfume_model->insert_perfume($perfume_data)) {
                    redirect('admin/add_perfume');
                } else {
                    redirect('admin/add_perfume');
                }
            }
        }
    }
    
}
