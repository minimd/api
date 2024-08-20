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
        // $this->db->order_by('id', 'desc');
        //the ready method 'get' Compiles and runs SELECT statement based
        // on the already called Query Builder methods.
        $query = $this->db->get('perfumes');
        return $query->result_array();
    }




















}