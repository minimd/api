<form method="post" action="<?= base_url('admin/create_brand'); ?>">
    <label for="name">Brand Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="logo_url">Logo URL:</label>
    <input type="text" id="logo_url" name="logo_url">

    <input type="submit" name="submit" value="Create Brand">
</form>
