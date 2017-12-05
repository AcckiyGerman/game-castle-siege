function downloadQuestions() {
    var questions = $("INPUT.input-question");
    var answers = $("INPUT.input-answer");
    //validation
    for (var i=0; i<questions.length; i++) {
        if ($(questions[i]).val().trim() == "") {
            showDialog("Question #" + (i+1)  + " can't be empty!");
            return;
        }
    }

    var tmpQuestions = [];
    for (var i=0; i<questions.length; i++) {
        tmpQuestions[i] = {
            "q": $(questions[i]).val(),
            "a": $(answers[i]).val()
        }
    }

    res = {"version": 1.0, "questions": "" + CryptoJS.AES.encrypt(JSON.stringify(tmpQuestions), "k234n111!?-Mnkw#")};
    uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(res));
    var x = $("<a download='questions.data' href='" + uriContent + "'></a>");

    x.appendTo('body');
    x[0].click();
    x.remove();
}

function hideQuestions() {
    var questions = $("INPUT.input-question");
    var answers = $("INPUT.input-answer");
    //validation
    for (var i=0; i<questions.length; i++) {
        if ($(questions[i]).val().trim() == "") {
            showDialog("Question #" + (i+1)  + " can't be empty!");
            return;
        }
    }
    Global.questions = [];
    for (var i=0; i<questions.length; i++) {
        Global.questions[i] = {
            "q": $(questions[i]).val(),
            "a": $(answers[i]).val()
        }
    }
    document.getElementById("questions-form").style.display = "none";
    questionsState.onSubmitClicked();
}

function showDialog(message) {
    $("#dialog-text").html(message);
    $("#dialog").show();

}
function hideDialog() {
    $("#dialog").hide();
}
function hideClimbers() {
    var climberNames = $("INPUT.climber-team-name");
    //validation
    for (var i=0; i<climberNames.length; i++) {
        if ($(climberNames[i]).val().trim() == "") {
            showDialog("Player #" + (i+1)  + " needs a name!");
            return;
        }
    }

    var avatars = $(".climber-avatar");
    for (var i=0; i<climberNames.length; i++) {
        Global.players[i].name = $(climberNames[i]).val().trim();
    }

    document.getElementById("climbers-form").style.display = "none";
    climbersState.onSubmitClicked();
}

function showQuestions() {
    //remove all questions
    $("#questions").html("");
    for (var i=0; i<Global.questions.length; i++)
        addQuestion(Global.questions[i].q, Global.questions[i].a, false);
    document.getElementById("questions-form").style.display = "block";
    updateSize();
}

function showClimbers() {
    document.getElementById("climbers-form").style.display = "block";
    $("#climbers").html("");
    for (var i=0; i<Global.players.length; i++)
        addClimber(Global.players[i].name, Global.players[i].avatar);
    updateSize();
}

function removeQuestion(row) {
    var id = row.data("id");
    row.remove();
    var i = 0;
    $(".question-row").each(function(){
        $("span", this).html("Question " + (i+1));
        $(this).data("id", i);
        i++;
    });
    $("#questions-scrollbar-holder").mCustomScrollbar("update");
    if ($("#questions").first().children().length <= Global.minQuestions) $(".button-delete").hide();
}

function updateSize() {
    document.getElementById("questions-form").style.width = (game.canvas.clientWidth) + "px";
    document.getElementById("questions-form").style.height = (game.canvas.clientHeight) + "px";
    document.getElementById("questions-form").style.marginLeft = game.canvas.style.marginLeft;

    document.getElementById("climbers-form").style.width = (game.canvas.clientWidth) + "px";
    document.getElementById("climbers-form").style.height = (game.canvas.clientHeight) + "px";
    document.getElementById("climbers-form").style.marginLeft = game.canvas.style.marginLeft;

    document.getElementById("dialog").style.width = (game.canvas.clientWidth) + "px";
    document.getElementById("dialog").style.height = (game.canvas.clientHeight) + "px";
    document.getElementById("dialog").style.marginLeft = game.canvas.style.marginLeft;

}

function addQuestion(questionText, answerText, scrollDown) {
    var noOfQuestion = $("#questions").first().children().length;
    $("#questions").append(
        '<div data-id="' + noOfQuestion + '" class="question-row">' +
        '	<span class="question">Question ' + (noOfQuestion+1) + '</span>' +
        '	<input class="input-question" type="text" value=""/>' +
        '	<input class="input-answer" type="text" value=""/>' +
        '   <div class="button-delete" onclick="removeQuestion($(this).parent())"></div>' +
        '</div>'
    );
    $("INPUT", $("#questions :last-child"))[0].value = questionText;
    $("INPUT", $("#questions :last-child"))[1].value = answerText;
    if (scrollDown)
        $("#questions-scrollbar-holder").mCustomScrollbar("scrollTo","bottom");
    if (noOfQuestion+1 > Global.minQuestions) $(".button-delete").show();
    if ($("#questions").first().children().length <= Global.minQuestions) $(".button-delete").hide();
}

function addClimber(playerName, knightColor) {
    //var noOfClimbers = $("#climbers").first().children().length;
    $("#climbers").append(
        '<div class="climber">' +
        '	<input class="climber-team-name" type="text" placeholder="Knight Name"/>' +
        '	<br/>' +
        '	<div class="climber-avatar">' +
        '		<img src="assets/knights/KnightFront' + knightColor + '.png"' +
        '            onclick="changePlayerColor($(this)[0])"' +
        '			 alt="' + knightColor + '"/>' +  // identify knight by this
        '	</div>' +
        //'	<br style="clear:both" />' +
        //'	<button class="climber-left" onclick="onLeftClicked($(this).parent())"></button>' +
        //'	<button class="climber-right" onclick="onRightClicked($(this).parent())"></button>' +
        '</div>'
    );
    $("INPUT", $("#climbers :last-child")).val(playerName);
}

function changePlayerColor(playerImg){
    var currentColor = playerImg.alt;
    var player = Global.players.filter(function(player){
        return player.avatar === currentColor
    })[0];
    console.log('Change color for', player.name);

    var freeColors = Global.knightColors.filter(function(color){
        var colorIsFree = true;
        Global.players.forEach(function(player){
            if (player.avatar === color)
                colorIsFree = false
        });
        return colorIsFree
    });

    if (freeColors.length == 0){
        console.warn('no free colors to choose');
        return
    }

    var newColor = freeColors[Math.floor(Math.random() * freeColors.length)];
    player.avatar = newColor;
    playerImg.alt = newColor;
    playerImg.src = "assets/knights/KnightFront" + newColor + ".png";
}