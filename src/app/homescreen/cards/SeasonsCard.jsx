const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');
const API = require('api');

const SeasonTile = require('app/seasons/SeasonTile.jsx');
const Waiting = require('app/common/Waiting.jsx');

const SeasonsCard = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(list) {
        var current = this.state;
        current.seasons = list;
        this.setState(current);
      }
    };
    API.seasons.getActive(callbacks);
  },
  render: function() {
    const t = this.props.t;
    var seasons;
    if (typeof this.state.seasons !== 'undefined') {
      seasons = this.state.seasons.map(function(season, index) {
        return (
          <MUI.GridTile
            key={'aaa-season_' + season.id} style={{padding: '5pt'}} cols={2} >
            <SeasonTile
              seasonId={season.id}
              data={season}
              readOnly={!this.state.seasonId}
              onDelete={this.deleteSeason}
              onEdit={this.editSeason} />
          </MUI.GridTile>
        );
      }, this);
    }
    return (
      <MUI.Card>
        <MUI.CardHeader
          title={t('home:seasons.title')}
          subtitle={t('home:seasons.subtitle')} />
        <MUI.CardText>
          <MUI.GridList
            cellHeight={'unset'}
            cols={2}
            padding={10}
            style={{width: '100%'}} >
            {(seasons || <Waiting />)}
          </MUI.GridList>
        </MUI.CardText>
      </MUI.Card>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['home', 'season'], SeasonsCard);
