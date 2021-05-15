import "../App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

/* 
Strings to look out for!
<script>
%00
<xml> ??
";" or "%3B"
<?=
*/

function CheckInput(userInput) {
    console.log(userInput)
    if(userInput.includes('<xml')) {
        return "Error";
    } 
    else if(userInput.includes('<scri')) {
        return "Error";
    }
    else if(userInput.includes('%00')) {
        return "Error";
    }
    else if(userInput.includes('%3B')) {
        return "Error";
    }
    else if(userInput.includes('<?=')) {
        return "Error";
    }
    else {
        return "Clean";
    }
}

export default CheckInput;