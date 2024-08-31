<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Perfume_model extends CI_Model {

    public function insert_perfume($data) {
        return $this->db->insert('perfumes', $data);
    }
    public function get_perfumes() {
        $this->db->select('*');
        $this->db->from('perfumes');
        $this->db->order_by('name');
        $query = $this->db->get();

        return $query->result_array();
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
    public function get_perfume_by_id($id) {
        return $this->db->get_where('perfumes', ['id' => $id])->row();
    }
    public function delete_perfume($id) {
        $this->db->where('id', $id);
        return $this->db->delete('perfumes');
    }

    public function update_perfume($id, $data) {
        $this->db->where('id', $id);
        return $this->db->update('perfumes', $data);
    }
    public function insert_note($data) {
        return $this->db->insert('notes', $data);
    }

    public function delete_note($id) {
        $this->db->where('id', $id);
        return $this->db->delete('notes');
    }
    public function insert_brand($data) {
        return $this->db->insert('brands', $data);
    }
}
