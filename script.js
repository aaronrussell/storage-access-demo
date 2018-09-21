app = {
  chars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',

  $elCookies: document.querySelector('.data-cookies'),
  $elLocalStorgae: document.querySelector('.data-local-storage'),
  $elSessionStorgae: document.querySelector('.data-session-storage'),

  regenerate() {
    this.generateSecret()
    this.displaySecret()
  },

  requestAccess() {
    if (document.requestStorageAccess) {
      self = this;
      document.requestStorageAccess()
        .then(function() {
          console.log('STORAGE ACCESS GRANTED')
          self.displaySecret()
        })
        .catch(function(err) {
          console.log('STORAGE ACCESS DENIED')
          console.log(err)
        })
    } else {
      console.log('Devise does not support Storage Access API')
    }
  },

  generateSecret: function() {
    var secret = '';
    for (var i = 0; i < 24; i++) {
      secret += this.chars.charAt(Math.floor(Math.random() * this.chars.length));
    }
    document.cookie = 'testSecret='+secret;
    window.localStorage.setItem('testSecret', secret);
    window.sessionStorage.setItem('testSecret', secret);
  },

  displaySecret: function() {
    var cookie = document.cookie.match(/testSecret=(.*);?/);
    this.$elCookies.innerHTML = cookie ? cookie[1] : null;
    this.$elLocalStorgae.innerHTML = window.localStorage.getItem('testSecret');
    this.$elSessionStorgae.innerHTML = window.sessionStorage.getItem('testSecret');
  }

};

(function() {
  if (document.hasStorageAccess) {
    document.hasStorageAccess()
      .then(function(hasAccess) {
        if (hasAccess) {
          app.displaySecret()
        } else {
          console.log('NO STORAGE ACCESS')
        }
      })
      .catch(function(reason) {
        console.log(reason)
      });
  } else {
    app.displaySecret()
  }
})();