function notifyMe(pseudo, message) {
  if (!("Notification" in window)) {
    alert("Ce navigateur ne supporte pas les notifications desktop");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification(pseudo + ": " + message);
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {

      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }

      if (permission === "granted") {
        var notification = new Notification(pseudo + ": " + message);
      }
    });
  }
}