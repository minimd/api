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
        $this->load->view('pages/'.$page, $data);
        $this->load->view('templates/second-footer', $data);
        $this->load->view('templates/footer', $data);
}


}