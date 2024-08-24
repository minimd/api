SELECT 
    p.id AS perfume_id,
    p.name AS perfume_name,
    b.id AS brand_id,
    b.name AS brand_name,
    b.logo_url AS brand_logo,
    p.perfumer,
    p.price,
    p.new_price,
    p.description,
    p.tag ,
    p.image_url AS perfume_image,
    p.created_at,
    
    -- Note arrays
    p.top_notes,
    p.middle_notes,
    p.base_notes,
    p.all_notes,
    
    -- Concatenated note names
    GROUP_CONCAT(DISTINCT CASE 
        WHEN JSON_CONTAINS(p.top_notes, CAST(n.id AS JSON))
        THEN n.name 
    END ORDER BY n.id ASC SEPARATOR ', ') AS top_note_names,
    
    GROUP_CONCAT(DISTINCT CASE 
        WHEN JSON_CONTAINS(p.middle_notes, CAST(n.id AS JSON))
        THEN n.name 
    END ORDER BY n.id ASC SEPARATOR ', ') AS middle_note_names,
    
    GROUP_CONCAT(DISTINCT CASE 
        WHEN JSON_CONTAINS(p.base_notes, CAST(n.id AS JSON))
        THEN n.name 
    END ORDER BY n.id ASC SEPARATOR ', ') AS base_note_names,
    
    GROUP_CONCAT(DISTINCT CASE 
        WHEN JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))
        THEN n.name 
    END ORDER BY n.id ASC SEPARATOR ', ') AS all_note_names

FROM 
    perfumes p
JOIN 
    brands b ON p.brand_id = b.id
LEFT JOIN 
    notes n ON JSON_CONTAINS(p.all_notes, CAST(n.id AS JSON))

GROUP BY 
    p.id
ORDER BY 
    p.id;