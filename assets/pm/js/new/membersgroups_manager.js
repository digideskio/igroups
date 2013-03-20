var valUser, valGroup;
$(document).ready(function () {
    dlgInviteUser = $("#dialog-invite-user").dialog({
        autoOpen: false,
        width: 640,
        buttons: {
            OK: function () {
                $.postJSON("/accounts/user/invite", $("input", dlgInviteUser), function (c) {
                    if (c.success) {
                        buildUserBlock(c);
                        $(this).dialog("close")
                    } else $(".error-message", dlgInviteUser).text(c.error)
                })
            },
            Cancel: function () {
                $(this).dialog("close")
            }
        }
    });
    var a = $("#dialog-user-edit-or-add-prototype");
    a.clone().attr("id", "dialog-user-edit").appendTo(a.parent());
    a.clone().attr("id", "dialog-user-add").appendTo(a.parent());
    $("#dialog-user-add").attr("title", "Add User");
    $("#dialog-user-add").dialog({
        autoOpen: false,
        width: 640,
        buttons: {
            Add: function () {
                var c = $(this),
                    g = $("#dialog-user-add").values();
                $("button", c).prop("disabled", true);
                $.postJSON("/accounts/user/save", g, function (f) {
                    if (typeof f == "object") if (f.error == false) {
                        c.dialog("close");
                        buildUserBlock(f);
                        $('#dialog-user-add input[type="text"]').val("");
                        $('#dialog-user-add input[type="checkbox"]').prop("checked", false);
                        $(".error-message", c).hide();
                        $(document).trigger("user-added", [f])
                    } else $(".error-message", c).html(f.message.replace(/\n/g, "<br />")).show();
                    $("button", c).prop("disabled", false)
                })
            },
            Cancel: function () {
                $(this).dialog("close")
            }
        }
    });
    $("#dialog-user-edit").attr("title", "Edit User");
    $("#dialog-user-edit").dialog({
        autoOpen: false,
        width: 640,
        buttons: {
            OK: function () {
                hideUserEdit(true)
            },
            Cancel: function () {
                hideUserEdit(false)
            }
        }
    });
    $("#dialog-group-edit").dialog({
        autoOpen: false,
        width: 350,
        buttons: {
            OK: function () {
                hideGroupEdit(true)
            },
            Cancel: function () {
                hideGroupEdit(false)
            }
        }
    });
    $("#dialog-delete").dialog({
        autoOpen: false,
        width: 480,
        buttons: {
            OK: function () {
                var c = $(".pending-deletion"),
                    g = c.hasClass("group") ? "/accounts/group/delete" : "/accounts/user/delete",
                    f = {
                        id: c.attr("rel")
                    };
                $.ajax({
                    url: OpenVBX.home + g,
                    data: f,
                    dataType: "json",
                    type: "POST",
                    success: function () {
                        c.fadeRemove()
                    }
                });
                $(".pending-deletion").removeClass("pending-deletion");
                $(this).dialog("close")
            },
            Cancel: function () {
                $(this).dialog("close")
            }
        }
    });
    var b = function () {
            $(".screen").animate({
                background: "none",
                opacity: 0
            }, 2E3, function () {
                $(".screen").hide()
            })
        },
        d = false,
        e = 0,
        h = 0,
        i = function (c, g) {
            if (c == h && g == e) d = true;
            if (d) {
                b();
                d = false
            } else setTimeout(function () {
                i(c, g)
            }, 1E3)
        },
        k = function (c) {
            for (var g in c) {
                var f = {
                    email: c[g],
                    is_admin: 0,
                    is_active: 1,
                    auth_type: "google",
                    notification: "email",
                    first_name: "",
                    last_name: "",
                    extension: Math.floor(Math.random() * 1E6 + 1),
                    password: Math.floor(Math.random() * 1E6 + 1)
                };
                $.ajax({
                    url: "/accounts/user/save",
                    data: f,
                    success: function (j) {
                        if (typeof j == "object") if (j.success == true) {
                            $(".screen .message").append("Added " + j.email + " Successfully<br />");
                            buildUserBlock(j)
                        } else $(".screen .message").append(j.email + " already exists, not modified.<br />");
                        h += 1
                    },
                    error: function (j, o, m) {
                        $(".screen .message").append(m)
                    },
                    type: "POST",
                    dataType: "json"
                })
            }
        },
        l = function (c) {
            for (var g in c) $.ajax({
                url: "/accounts/group/save",
                data: {
                    name: c[g]
                },
                success: function (f) {
                    if (typeof f == "object") if (f.success == true) {
                        $.notify("Added group " + f.name + " successfully.");
                        buildGroupBlock(f)
                    } else $.notify(f.name + " already exists, not modified.");
                    e += 1
                },
                type: "POST",
                dataType: "json"
            })
        },
        n = function () {
            $.ajax({
                url: "/accounts/appsync",
                data: $("#dialog-google-app-sync input"),
                success: function (c) {
                    if (c.error) {
                        $(".screen").html('<div class="message">It didn\'t quite work out, very sorry about that: ' + c.message + '<br /><button class="hide-worker">Continue</Button></div>');
                        $(".hide-worker").click(b)
                    } else {
                        $(".screen").html('<div class="message">Awesome, we got some users to process... <br />working on that now...<br /></div>');
                        k(c.users);
                        l(c.groups);
                        i(c.users.length, c.groups.length)
                    }
                },
                error: function () {
                    $(".screen").html('<div class="message">Holy crap!!! SOMETHING WENT WRONG WITH THE INTARWEBZ<br /><button class="hide-worker">Continue</Button></div>');
                    $(".hide-worker").click(b)
                },
                dataType: "json",
                type: "POST"
            })
        };
    dlgGoogleAppSync = $("#dialog-google-app-sync").dialog({
        autoOpen: false,
        width: 480,
        buttons: {
            OK: function () {
                $(this).dialog("close");
                $(".screen").show().animate({
                    backgroundColor: "#000000",
                    display: "toggle",
                    opacity: 0.8
                }, 500, "linear", function () {
                    $(".screen").html('<div style="margin: 10% auto; width: 100%; position: absolute; z-index: 999999; color: white; opacity: 1;">Synchronizing your intarwebs, please hold...</div>');
                    setTimeout(n, 2E3)
                })
            },
            Cancel: function () {
                $(this).dialog("close")
            }
        }
    });
    $("#button-add-user").click(function () {
        showUserAdd(null);
        return false
    });
    $("#button-add-group").click(function () {
        showGroupEdit(null);
        return false
    });
    $("#google-app-sync").click(function () {
        dlgGoogleAppSync.dialog("open")
    });
    $(".user-edit, .group-edit").livequery("click", function () {
        var c = $(this).closest(".group, .user");
        c.hasClass("group") ? $.postJSON("/accounts/group/get", {
            id: c.attr("rel")
        }, showGroupEdit) : $.postJSON("/accounts/user/get", {
            id: c.attr("rel")
        }, showUserEdit);
        return false
    });
    $(".user-remove, .group-remove").livequery("click", function () {
        var c = $(this).closest(".group, .user").addClass("pending-deletion");
        $("#dConfirmMsg").text("Are you sure you want to delete this " + (c.hasClass("group") ? "group" : "user") + "?");
        $("#dialog-delete").dialog("open");
        return false
    });
    addUserEvents(".user");
    addGroupUserEvents(".group li");
    addGroupEvents(".group");
    valUser = $("#dialog-user-edit form").validate({
        rules: {
            first_name: {
                required: true,
                minlength: 2
            },
            last_name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            extension: {
                digits: true
            }
        },
        messages: {
            first_name: {
                required: "First name required",
                minlength: "First name too short"
            },
            last_name: {
                required: "Last name required",
                minlength: "Last name too short"
            },
            email: {
                required: "Email required",
                email: "Invalid email"
            },
            extension: {
                digits: "Numbers only"
            }
        }
    });
    valGroup = $("#dialog-group-edit form").validate({
        rules: {
            group_name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            group_name: {
                required: "Group name required",
                minlength: "Group name too short"
            }
        }
    })
});

function addGroupEvents(a) {
    $(a).click(function () {
        $(this).toggleClass("expanded", !$(this).hasClass("expanded"))
    });
    $(a).droppable({
        accept: ".user",
        hoverClass: "ui-state-hover",
        drop: function (b, d) {
            var e = $(this),
                h = d.draggable.closest(".user").attr("rel");
            if (!e.is(':has(li[rel="' + h + '"])')) {
                $(".ui-draggable-dragging").hide();
                var i = d.draggable.find(".user-name").text(),
                    k = e.find(".group-name").text();
                params = {
                    group_id: e.attr("rel"),
                    user_id: h
                };
                $(".group-counter", e).hide();
                $(".group-counter-loader", e).show();
                $.ajax({
                    url: "/accounts/group_user/add",
                    data: params,
                    success: function (l) {
                        if (!l.error) {
                            $("ul", e).append('<li rel="' + h + '"><span>' + i + '</span> <a class="remove">Remove</a></li>');
                            addGroupUserEvents($("li:last-child", e));
                            $(".group-counter-loader", e).hide();
                            $(".group-counter", e).show().text($(".members li", e).length);
                            $.notify(i + " has been added to " + k)
                        }
                    },
                    dataType: "json",
                    type: "POST"
                })
            }
        }
    })
}

function addUserEvents(a) {
    return $(a).click(function () {
        if ($(this).hasClass("selected")) $(this).removeClass("selected");
        else {
            $(".user").removeClass("selected");
            $(this).addClass("selected")
        }
    }).draggable({
        revert: true,
        helper: "clone",
        zIndex: "2",
        opacity: 0.7
    })
}

function addGroupUserEvents(a) {
    $("a.remove", a).click(function (b) {
        b.stopPropagation();
        var d = $(this).closest("li"),
            e = $(this).closest(".group");
        params = {
            group_id: e.attr("rel"),
            user_id: d.attr("rel")
        };
        $.ajax({
            url: "/accounts/group_user/delete",
            data: params,
            success: function (h) {
                if (!h.error) {
                    h = $("span", d).text();
                    var i = $(".group-name", e).text();
                    $.notify(h + " has been removed from " + i);
                    d.fadeOut(function () {
                        d.remove();
                        userCount = $(".members li", e).length;
                        $(".group-counter", e).text(userCount)
                    })
                }
            },
            error: function () {},
            type: "POST",
            dataType: "json"
        })
    })
}
function showUserAdd() {
    var a = $("#dialog-user-add");
    $('input[type="text"]', a).val("").first().focus();
    $(".single-existing-number", a).show();
    $(".multiple-existing-numbers", a).hide();
    setTimeout(function () {
        $("#dialog-user-add input:first").focus()
    }, 100);
    a.dialog("open")
}


function buildUserBlock(a) {
    var b = $('.user[rel="' + a.id + '"]');
    if (b.length < 1) {
        b = $('.user[rel="prototype"]').clone().attr("rel", a.id);
        b.appendTo("#user-container ul.user-list").fadeIn();
        addUserEvents(b)
    }
    var d = a.first_name + " " + a.last_name;
    $(".user-name", b).text(d);
    $(".user-email", b).text(a.email);
    $('.members li[rel="' + a.id + '"] span').text(d)
}

function buildGroupBlock(a) {
    var b = $('.group[rel="' + a.id + '"]');
    if (b.length < 1) {
        b = $('.group[rel="prototype"]').clone();
        b.attr("rel", a.id);
        b.appendTo("#group-container ul.group-list");
        b.fadeIn();
        addGroupEvents(b)
    }
    $(".group-name", b).text(a.name)
}

function hideUserEdit(a) {
    var b = $("#dialog-user-edit");
    if (a) {
        if (valUser.form() != false) {
            a = $("#dialog-user-edit").values();
            $.postJSON("/accounts/user/save", a, function (d) {
                if (typeof d == "object") if (d.error == false) {
                    b.dialog("close");
                    buildUserBlock(d);
                    $(document).trigger("user-edited", [d])
                } else $(".error-message", b).html(d.message.replace(/\n/g, "<br />")).show()
            })
        }
    } else b.dialog("close")
}

function showGroupEdit(a) {
	console.log( 'showGroupEdit:', a );
	
   // $("#modal-from-dom").dialog({
     //   title: b ? "Edit Group" : "Add New Group"
    //});
	//modal-from-dom
    var b = typeof a == "object" && a != false && a != null;
    $("#dialog-group-edit").dialog({
        title: b ? "Edit Group" : "Add New Group"
    });
    $($("#dialog-group-edit")).closest(".ui-dialog").addClass(b ? "manage" : "add").removeClass(b ? "add" : "manage");
    $('input[type="hidden"]', $("#dialog-group-edit")).val("");
    $("form", $("#dialog-group-edit")).get(0).reset();
    b && $("#dialog-group-edit").values(a);
    valGroup.resetForm();
    $("#dialog-group-edit").dialog("open")
}

function hideGroupEdit(a) {
    if (a) {
        if (valGroup.form() != false) {
            a = $("#dialog-group-edit").values();
            var b = true;
            if (a.id) b = false;
            $.postJSON("/accounts/group/save", a, function (d) {
                if (typeof d == "object") if (d.error) $("#dialog-group-edit .error-message").text(d.message).show();
                else {
                    b ? $.notify('Added Group "' + d.name + '" successfully.') : $.notify('Updated Group "' + d.name + '" successfully.');
                    $("#dialog-group-edit").dialog("close");
                    $("#dialog-group-edit .error-message").hide();
                    buildGroupBlock(d);
                    b ? $(document).trigger("group-added", [d]) : $(document).trigger("group-edited", [d])
                }
            })
        }
    } else $("#dialog-group-edit").dialog("close")
};