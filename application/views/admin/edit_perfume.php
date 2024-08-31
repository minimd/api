<!-- Path: application/views/admin/edit_perfume.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Perfume</title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css') ?>/admin.css">

</head>
<body>

    <h1>Edit Perfume</h1>

    <?php if(isset($perfume)): ?>
        <form action="<?php echo base_url('sfgilsdf_uwedva/update_perfume/' . $perfume->id); ?>" method="POST" enctype="multipart/form-data">
            <label for="name">Name:</label>
            <input type="text" name="name" value="<?php echo set_value('name', $perfume->name); ?>" required><br>

            <label for="arabic_name">Arabic Name:</label>
            <input type="text" name="arabic_name" value="<?php echo set_value('arabic_name', $perfume->arabic_name); ?>"><br>

            <label for="gender">Gender:</label>
            <select name="gender">
                <option value="male" <?php echo set_select('gender', 'male', ($perfume->gender == 'male')); ?>>Male</option>
                <option value="female" <?php echo set_select('gender', 'female', ($perfume->gender == 'female')); ?>>Female</option>
                <option value="unisex" <?php echo set_select('gender', 'unisex', ($perfume->gender == 'unisex')); ?>>Unisex</option>
            </select><br>

            <label for="brand">Brand:</label>
            <select name="brand">
                <?php foreach($brands as $brand): ?>
                    <option value="<?php echo $brand->id; ?>" <?php echo set_select('brand', $brand->id, ($perfume->brand_id == $brand->id)); ?>><?php echo $brand->name; ?></option>
                <?php endforeach; ?>
            </select><br>

            <label for="perfumer">Perfumer:</label>
            <input type="text" name="perfumer" value="<?php echo set_value('perfumer', $perfume->perfumer); ?>"><br>

            <label for="size">Size:</label>
            <input type="text" name="size" value="<?php echo set_value('size', $perfume->size); ?>"><br>

            <label for="price">Price:</label>
            <input type="text" name="price" value="<?php echo set_value('price', $perfume->price); ?>"><br>

            <label for="new_price">New Price:</label>
            <input type="text" name="new_price" value="<?php echo set_value('new_price', $perfume->new_price); ?>"><br>

            <label for="size_2nd">Second Size:</label>
            <input type="text" name="size_2nd" value="<?php echo set_value('size_2nd', $perfume->size_2nd); ?>"><br>

            <label for="price_2nd">Second Price:</label>
            <input type="text" name="price_2nd" value="<?php echo set_value('price_2nd', $perfume->price_2nd); ?>"><br>

            <label for="new_price_2nd">New Second Price:</label>
            <input type="text" name="new_price_2nd" value="<?php echo set_value('new_price_2nd', $perfume->new_price_2nd); ?>"><br>

            <label for="description">Description:</label>
            <textarea name="description"><?php echo set_value('description', $perfume->description); ?></textarea><br>

            <label for="tag">Tag:</label>
            <input type="text" name="tag" value="<?php echo set_value('tag', $perfume->tag); ?>"><br>

            <label for="top_notes">Top Notes:</label>
            <input type="text" name="top_notes" value="<?php echo set_value('top_notes', $perfume->top_notes); ?>"><br>

            <label for="middle_notes">Middle Notes:</label>
            <input type="text" name="middle_notes" value="<?php echo set_value('middle_notes', $perfume->middle_notes); ?>"><br>

            <label for="base_notes">Base Notes:</label>
            <input type="text" name="base_notes" value="<?php echo set_value('base_notes', $perfume->base_notes); ?>"><br>

            <label for="all_notes">All Notes:</label>
            <input type="text" name="all_notes" value="<?php echo set_value('all_notes', $perfume->all_notes); ?>"><br>

            <label for="status">Status:</label>
            <input type="text" name="status" value="<?php echo set_value('status', $perfume->status); ?>"><br>

            <label for="box">Box:</label>
            <input type="text" name="box" value="<?php echo set_value('box', $perfume->box); ?>"><br>

            <label for="image">Image:</label>
            <input type="file" name="image"><br>
            <img src="<?php echo base_url($perfume->image_url); ?>" alt="Perfume Image" width="100"><br>

            <button type="submit">Update Perfume</button>
        </form>
    <?php else: ?>
        <p>Perfume not found!</p>
    <?php endif; ?>

</body>
</html>
