<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect input data
    $state = $_POST['state'];
    $party = $_POST['party'];
    $age = $_POST['age'];
    $income = $_POST['income'];
    
    // Placeholder prediction logic
    // In a real application, you would load a trained machine learning model
    function predictOutcome($state, $party, $age, $income) {
        // Simplified prediction logic (replace with actual model logic)
        if ($party == 'democratic') {
            return 'Democratic candidate is predicted to win in ' . ucfirst($state);
        } else {
            return 'Republican candidate is predicted to win in ' . ucfirst($state);
        }
    }
    
    // Get the prediction result
    $prediction = predictOutcome($state, $party, $age, $income);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prediction Result</title>
</head>
<body>
    <h1>Prediction Result</h1>
    <p><?php echo $prediction; ?></p>
    <a href="index.html">Go Back</a>
</body>
</html>
