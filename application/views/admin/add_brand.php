<!-- Path: application/views/admin/add_brand.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Brand</title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css') ?>/admin.css">

</head>
<body>

    <h1>Add Brand</h1>

    <form action="<?php echo base_url('sfgilsdf_uwedva/save_brand'); ?>" method="POST" enctype="multipart/form-data">
        <label for="name">Brand Name:</label>
        <input type="text" name="name" required><br>

        <label for="brand_image">Brand Image:</label>
        <input type="file" name="brand_image"><br>

        <button type="submit">Add Brand</button>
    </form>

</body>
</html>
