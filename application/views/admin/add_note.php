<!-- Path: application/views/admin/add_note.php -->
<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="<?php echo base_url('assets/css/admin.css') ?>">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Note</title>
</head>
<body>

    <h1>Add Note</h1>

    <form action="<?php echo base_url('sfgilsdf_uwedva/save_note'); ?>" method="POST" enctype="multipart/form-data">
        <label for="name">Note Name:</label>
        <input type="text" name="name" required><br>

        <label for="note_image">Note Image:</label>
        <input type="file" name="note_image"><br>

        <button type="submit">Add Note</button>
    </form>

</body>
</html>
