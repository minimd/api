<?php
class Pages extends CI_Controller {

        public function view($page = 'main')
{
        if ( ! file_exists(APPPATH.'views/pages/'.$page.'.php'))
        {
                // Whoops, we don't have a page for that!
                show_404();
        }

        $data['all']='sui';

        $this->load->view('templates/header', $data);
        $this->load->view('templates/second_header', $data);
        $this->load->view('pages/main', $data);
        $this->load->view('templates/second-footer', $data);
        $this->load->view('templates/footer', $data);
}
public function ar(){
        $this->load->view('templates/header_ar');
        $this->load->view('templates/second-header_ar');
        $this->load->view('pages/main_ar');
        $this->load->view('templates/second-footer_ar');
        $this->load->view('templates/footer_ar');
}


}