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


    public function get_all($type = '', $name = '', $limit = 10, $offset = 0)
    {
        // Select statement
        $this->db->select('
            p.id AS perfume_id,
            p.name AS perfume_name,
            b.id AS brand_id,
            b.name AS brand_name,
            b.logo_url AS brand_logo,
            p.perfumer,
            p.price,
            p.description,
            p.image_url AS perfume_image,
            p.created_at,
            p.top_notes,
            p.middle_notes,
            p.base_notes,
            p.all_notes,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.top_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.name ASC SEPARATOR \', \') AS top_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.middle_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.name ASC SEPARATOR \', \') AS middle_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.base_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.name ASC SEPARATOR \', \') AS base_note_names,
            GROUP_CONCAT(DISTINCT CASE 
                WHEN JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))
                THEN n.name 
            END ORDER BY n.name ASC SEPARATOR \', \') AS all_note_names
        ');

        // From and Join statements
        $this->db->from('perfumes p');
        $this->db->join('brands b', 'p.brand_id = b.id');
        $this->db->join('notes n', 'JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))', 'left');

        // Optional: Add WHERE conditions
        // $this->db->where('p.id', 1);
        // $this->db->like('p.name', 'Floral');

if($type!== 'all'){
        //search by perfume id.. for getting perfume details
          if ($type == 'p.id') {
            $this->db->where('p.id', $name);
        }
        // search by brand id.. by clicking on a note
        else if ($type == 'b.id') {
            $this->db->where('b.id', $name);
        }
        else if ($type == 'p.perfumer') {
            $this->db->where('p.perfumer', $name);
        }
        //search by note.. by clicking on a note
         else if ($type == 'p.all_notes') {
            $this->db->where('JSON_CONTAINS(p.all_notes,CAST('.$name.' AS JSON))');
        
        }
    //     //search by name name
       else if ($type != 'p.id' && $type != '') {
            $this->db->like($type, $name, 'both');
           ;
        }}

        // Group By and Order By
        $this->db->group_by('p.id');
        $this->db->order_by('p.name');
        // Limit the result
        $this->db->limit($limit, $offset);
        // Execute the query
        $query = $this->db->get();

        // Return the result
        return $query->result();
    }
}
