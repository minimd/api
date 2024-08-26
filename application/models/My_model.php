<?php
class My_model extends CI_Model
{
    public function __construct()
    {
        //database loaded by RM load
        //Loads a configuration file.
        //we will refer to ready made method by RM 'not real madrid'
        //darabase() is a RM that prepares the database that we already set in config/database
        $this->load->database();
    }


    public function get_all()
    {
        // Select statement
        $this->db->select('
            p.id AS perfume_id,
            p.name AS perfume_name,
            p.arabic_name AS perfume_arabic_name,
            p.gender,
            p.box,
            b.id AS brand_id,
            b.name AS brand_name,
            b.logo_url AS brand_logo,
            p.perfumer,
            p.size,
            p.price,
            p.new_price,
            p.size_2nd,
            p.price_2nd,
            p.new_price_2nd,
            p.status,
            p.description,
            p.tag,
            p.image_url AS perfume_image,
            p.created_at,
            p.top_notes,
            p.middle_notes,
            p.base_notes,
            p.all_notes,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.top_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.id ASC SEPARATOR \', \') AS top_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.middle_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.id ASC SEPARATOR \', \') AS middle_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.base_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.id ASC SEPARATOR \', \') AS base_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.id ASC SEPARATOR \', \') AS all_note_names
        ');

        // From and Join statements
        $this->db->from('perfumes p');
        $this->db->join('brands b', 'p.brand_id = b.id');
        $this->db->join('notes n', 'JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))', 'left');

        // Optional: Add WHERE conditions
        // $this->db->where('p.id', 1);
        // $this->db->like('p.name', 'Floral');
        // Group By and Order By
        $this->db->group_by('p.id');
        $this->db->order_by('p.name');


        // Execute the query
        $query = $this->db->get();

        // Return the result
        return $query->result();
    }
    public function get_brands(){
        $this->db->select('*');
        $this->db->from('brands');
        $query = $this->db->get();
        return $query->result();
    }
    public function get_notes(){
        $this->db->select('*');
        $this->db->from('notes');
        $query = $this->db->get();
        return $query->result();
    }
}
