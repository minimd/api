<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add New Perfume</title>
    <link rel="stylesheet" href="<?php echo base_url('assets/css') ?>/admin.css">
</head>

<body>
    <div class="container">
        <h1>Add New Perfume</h1>

        <!-- Display flash messages -->


        <form action="<?= base_url('sfgilsdf_uwedva/save_perfume'); ?>" method="POST" enctype="multipart/form-data">
            <!-- Text Inputs -->
            <label for="name">Perfume Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="arabic_name">Arabic Name:</label>
            <input type="text" id="arabic_name" name="arabic_name"><br>

            <label for="gender">Gender:</label>

            <select name="gender" id="gender">

                <option value="0">Unisex</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
            </select>


            <label for="brand">Brand:</label>

            <select name="brand" id="brand">
                
                
                <?php foreach ($brands as $brand) : ?>

                    
                        <option value="<?= $brand->id; ?>"><?= $brand->name; ?></option><?= $brand->name; ?>
                        
                    
                <?php endforeach; ?>

            </select>
            



            <label for="perfumer">Perfumer:</label>
            <input type="text" id="perfumer" name="perfumer"><br>


            <label for="size">Size:</label>
            <input type="number" name="size" id="size">
            <p>لا تحط غير الرقم</p>
            
             

            <label for="price">Price:</label>
            <input type="number" step="0.01" id="price" name="price" required placeholder="$"><br>
            <p>لا تحط علامة دولار حط بس الرقم.. بالدولار طبعا</p>

            <label for="new_price">New Price:</label>
            <input type="number" step="0.01" id="new_price" name="new_price" placeholder="optional"><br>

            <label for="size_2nd">Second Size:</label>
            <input type="number" id="size_2nd" name="size_2nd" placeholder="optional"><br>

            <label for="price_2nd">Second Price:</label>
            <input type="number" step="0.01" id="price_2nd" name="price_2nd" placeholder="optional"><br>

            <label for="new_price_2nd">New Price for Second Size:</label>
            <input type="number" step="0.01" id="new_price_2nd" name="new_price_2nd " placeholder="optional"><br>

            <label for="description">Description:</label>
            <textarea id="description" name="description"></textarea><br>

            <label for="tag">Tag:</label>
            <textarea id="tag" name="tag"></textarea><br>

            <!-- Image Upload -->
            <label for="image">Perfume Image:</label>
            <input type="file" id="image" name="image" required><br>

            <!-- Notes -->
            <label for="top_notes">Top Notes (JSON):</label>
            <textarea id="top_notes" name="top_notes"></textarea><br>
            لازم لازم لازم تدخلها بهالطريقة

            [5,2,1,6]
            نفس الاقواس ونفس الفوارز وشكد ما تريد.. اذا تخطأ تزرب
            <label for="middle_notes">Middle Notes (JSON):</label>
            <textarea id="middle_notes" name="middle_notes"></textarea><br>
نفس الحجي
            <label for="base_notes">Base Notes (JSON):</label>
            <textarea id="base_notes" name="base_notes"></textarea><br>
نفس الحجي
            <label for="all_notes">All Notes (JSON):</label>
            <textarea id="all_notes" name="all_notes"></textarea><br>
هنا تحط كل النوتات و مو الا بالتسلسل عادي
            <label for="status">Status:</label>
            
<select name="status" id="status">
    <option value="1">normal</option>
    <option value="2">new arrival</option>
    <option value="3">discounted</option>
    <option value="4">new arrival and discounted</option>
    <option value="5">unboxed</option>
    <option value="6">rare</option>
    <option value="7">tester</option>
</select>
            <label for="box">Box:</label>
            <select name="box" id="box">
                <option value="0">new</option>
                <option value="1">tester</option>
                <option value="2">unboxed</option>
                <option value="3">rare</option>
          
            </select>

            <!-- Submit -->
            <input type="submit" value="Add Perfume">
        </form>
    </div>
    <div class="brands">
        <?php foreach ($notes as $brand) : ?>

            <div class="brand">
                <p><?= $brand->name; ?>__</p>
                <p><?= $brand->id; ?></p>
            </div>
        <?php endforeach; ?>
    </div>
    <script>
        console.log('hello');
        document.querySelector('#brand').addEventListener('change', function(e) {
            console.log(document.querySelector('#brand').value)
        })
    </script>
</body>

</html>