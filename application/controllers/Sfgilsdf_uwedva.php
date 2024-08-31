<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Sfgilsdf_uwedva extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->model('Perfume_model');
    }
    public function index() {
        $data['perfumes'] = $this->Perfume_model->get_perfumes();
        $this->load->view('admin/dashboard', $data);
    }
    public function add_perfume()
    {
        $data['brands'] = $this->Perfume_model->get_brands();
        $data['notes'] = $this->Perfume_model->get_notes();
        $this->load->view('admin/add_perfume', $data);
    }
    public function delete_perfume($id) {
        if ($this->Perfume_model->delete_perfume($id)) {
            // Perfume deleted successfully
            redirect('sfgilsdf_uwedva/index');
        } else {
            // Handle the error case, if needed
            redirect('sfgilsdf_uwedva/index');
        }
    }


    public function save_perfume()
    {
        if ($this->input->method() === 'post') {
            // Handle file upload
            $config['upload_path'] = './assets/perfumes/';
            $config['allowed_types'] = 'jpg|jpeg|png';
            $config['max_size'] = 5120; // 5MB
            $config['file_name'] = uniqid(); // Generate a unique file name

            $this->load->library('upload', $config);

            if (!$this->upload->do_upload('image')) {
                // If there is an error during upload
                $error = $this->upload->display_errors();

                redirect('sfgilsdf_uwedva/add_perfume');
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
                    redirect('sfgilsdf_uwedva/index');
                } else {
                    redirect('sfgilsdf_uwedva/add_perfume');
                }
            }
        }
    }

    public function edit_perfume($id)
    {
        $data['perfume'] = $this->Perfume_model->get_perfume_by_id($id);
        $data['brands'] = $this->Perfume_model->get_brands();
        $data['notes'] = $this->Perfume_model->get_notes();

        if (!$data['perfume']) {
            show_404();
        }

        $this->load->view('admin/edit_perfume', $data);
    }

    public function update_perfume($id)
    {
        if ($this->input->method() === 'post') {
            // Handle file upload
            $config['upload_path'] = './assets/perfumes/';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size'] = 5120; // 5MB
            $config['file_name'] = uniqid(); // Generate a unique file name

            $this->load->library('upload', $config);
            $image_url = $this->input->post('existing_image'); // Use the existing image by default

            if (!empty($_FILES['image']['name']) && $this->upload->do_upload('image')) {
                // If a new image is uploaded, replace the existing one
                $upload_data = $this->upload->data();
                $image_url = 'assets/perfumes/' . $upload_data['file_name'];
            }

            // Prepare data for update
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

            // Update the perfume in the database
            if ($this->Perfume_model->update_perfume($id, $perfume_data)) {
                redirect('sfgilsdf_uwedva/index');
            } else {
                redirect('sfgilsdf_uwedva/edit_perfume/' . $id);
            }
        }
    }
    public function add_note() {
        $this->load->view('admin/add_note');
    }

    public function save_note() {
        if ($this->input->method() === 'post') {
            // Handle file upload
            $config['upload_path'] = './assets/images/notes/';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size'] = 5120; // 5MB
            $config['file_name'] = uniqid(); // Generate a unique file name
    
            $this->load->library('upload', $config);
            $note_image = NULL;
    
            if (!empty($_FILES['note_image']['name']) && $this->upload->do_upload('note_image')) {
                // If a new image is uploaded
                $upload_data = $this->upload->data();
                $note_image = 'assets/images/notes/' . $upload_data['file_name'];
            }
    
            // Prepare data for insertion
            $note_data = array(
                'name' => $this->input->post('name'),
                'note_image' => $note_image
            );
    
            // Save to the database
            if ($this->Perfume_model->insert_note($note_data)) {
                redirect('sfgilsdf_uwedva/index');
            } else {
                // Handle the error case, if needed
                redirect('sfgilsdf_uwedva/add_note');
            }
        }
    }
    public function add_brand() {
        $this->load->view('admin/add_brand');
    }

    public function save_brand() {
        if ($this->input->method() === 'post') {
            // Handle file upload
            $config['upload_path'] = './assets/images/brands/';
            $config['allowed_types'] = 'jpg|jpeg|png|gif';
            $config['max_size'] = 5120; // 5MB
            $config['file_name'] = uniqid(); // Generate a unique file name
    
            $this->load->library('upload', $config);
            $brand_image = NULL;
    
            if (!empty($_FILES['brand_image']['name']) && $this->upload->do_upload('brand_image')) {
                // If a new image is uploaded
                $upload_data = $this->upload->data();
                $brand_image = 'assets/images/brands/' . $upload_data['file_name'];
            }
    
            // Prepare data for insertion
            $brand_data = array(
                'name' => $this->input->post('name'),
                'logo_url' => $brand_image
            );
    
            // Save to the database
            if ($this->Perfume_model->insert_brand($brand_data)) {
                redirect('sfgilsdf_uwedva/index');
            } else {
                // Handle the error case, if needed
                redirect('sfgilsdf_uwedva/add_brand');
            }
        }
    }
}
