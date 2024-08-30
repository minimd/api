<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Perfume_model extends CI_Model {

    public function insert_perfume($data) {
        return $this->db->insert('perfumes', $data);
    }
    public function get_perfumes() {
        return $this->db->get('perfumes')->result_array();
    }
    public function get_brands() {
        $this->db->select('*');
        $this->db->from('brands');
        $query = $this->db->get();
        return $query->result();
    }
    public function get_notes() {
        $this->db->select('*');
        $this->db->from('notes');
        $query = $this->db->get();
        return $query->result();
    }
}
