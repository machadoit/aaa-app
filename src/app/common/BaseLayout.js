var React = require('react');
var Footer = require('./Footer');
var Header = require('./Header');
var DrawerMenu = require('./DrawerMenu.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"	rel="stylesheet" />
          <link rel="stylesheet"	href="css/app.css" />
          <script	src="https://storage.googleapis.com/code.getmdl.io/1.0.4/material.min.js" />
          <link rel="stylesheet" href="https://code.jquery.com/ui/1.9.2/themes/base/jquery-ui.css"/>
          <script src="https://code.jquery.com/jquery-2.1.4.js" />
          <script src="https://code.jquery.com/ui/1.11.4/jquery-ui.js" />

          <script src="scripts/crypto-js-md5.js" />
          <script src="scripts/engine.js" />
          <script src="scripts/ui.js" />
        </head>
        <body>
          <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
            <Header title="Welcome to Advanced Archery" />
            <DrawerMenu />
            <main className='mdl-layout__content'>
              <div id='aaa_content' className='page-content mdl-grid'>
                {this.props.children}
              </div>
            </main>
            <Footer languages={this.props.languages} />
          </div>
          <script> window.makeFreakingMDLWork() </script>
        </body>
      </html>
    );
  }
});
