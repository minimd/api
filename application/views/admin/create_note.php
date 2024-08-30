<form method="post" action="<?= base_url('admin/create_note'); ?>">
    <label for="name">Note Name:</label>
    <input type="text" id="name" name="name" required>

    <label for="note_image">Note Image URL:</label>
    <input type="text" id="note_image" name="note_image">

    <input type="submit" name="submit" value="Create Note">
</form>
