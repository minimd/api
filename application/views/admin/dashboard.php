<!-- Path: application/views/admin/dashboard.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="<?php echo base_url('assets/css/admin.css') ?>">
    <title>admin page</title>
</head>

<body>
    <header>what do you want to do ?</header>
    <div>add
        <a href="<?php echo base_url('sfgilsdf_uwedva/add_perfume') ?>">
            <button>add perfum</button></a>
        <a href="<?php echo base_url('sfgilsdf_uwedva/add_note') ?>">
            <button>Add Note</button>
        </a>
        <a href="<?php echo base_url('sfgilsdf_uwedva/add_brand') ?>">
            <button>Add Brand</button>
        </a>
    </div>
    <div>edit
        <h2>Edit Perfumes</h2>
        <ul>
            <?php foreach ($perfumes as $perfume) : ?>
                <li>
                    <?php echo $perfume['name']; ?>
                    <a href="<?php echo base_url('sfgilsdf_uwedva/edit_perfume/' . $perfume['id']); ?>">
                        <button>Edit</button>
                    </a>
                    <a href="<?php echo base_url('sfgilsdf_uwedva/delete_perfume/' . $perfume['id']); ?>" onclick="return confirm('Are you sure you want to delete this perfume?');">
                        <button>Delete</button>
                    </a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>

    <script src="<?php echo base_url('assets/js/admin.js') ?>"></script>
</body>

</html>