const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const Waiting = require('app/common/Waiting.jsx');
const SeasonGraph = require('svg/SeasonGraph.jsx');

const API = require('api');

const SeasonTile = React.createClass({
  propTypes: {
    // TODO create class to validate
    data: React.PropTypes.object,
    seasonId: React.PropTypes.number,
    readOnly: React.PropTypes.bool,
    onEdit: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    t: React.PropTypes.func
  },
  getInitialState: function() {
    return this.props.data; // TODO maybe remove this?
  },
  componentDidMount: function() {
    var callbacks = {
      context: this,
      success: function(season) {
        this.setState(season);
      }
    };
    API.seasons.getById(this.props.seasonId, callbacks);
  },
  onDelete: function() {
    this.props.onDelete(this.props.seasonId);
  },
  onEdit: function() {
    this.props.onEdit(this.props.seasonId);
  },
  render: function() {
    const t = this.props.t;

    return (
      <MUI.Paper zDepth={1}>
        <MUI.Card>
          <MUI.CardHeader
            title={this.state.name}
            subtitle={t('season:tile.subtitle', this.state)} />
          <MUI.CardText>
            {this.state.goals ? <SeasonGraph data={this.state} /> : <Waiting />}
          </MUI.CardText>

          <MUI.CardActions style={{textAlign: 'right'}}>
            {this.props.readOnly ?
              <MUI.FloatingActionButton
                mini={true}
                onTouchTap={this.onEdit}
                style={{margin: '5pt'}}>
                <MUI.icons.editor.mode_edit />
              </MUI.FloatingActionButton> : null}
            <MUI.FloatingActionButton
              mini={true}
              onTouchTap={this.onDelete}
              secondary={true} style={{margin: '5pt'}}>
              <MUI.icons.action.delete />
            </MUI.FloatingActionButton>
          </MUI.CardActions>
        </MUI.Card>
      </MUI.Paper>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['season'], SeasonTile);
