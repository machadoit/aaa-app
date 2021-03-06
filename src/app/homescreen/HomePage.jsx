const React = require('react');

const i18nextReact = require('global/i18nextReact');
const MUI = require('app/common/MaterialUI');

const BaseLayout = require('app/common/BaseLayout.jsx');
const TotalArrowsCard = require('app/homescreen/cards/TotalArrowsCard.jsx');
const EventsCard = require('app/homescreen/cards/EventsCard.jsx');
const YearOverviewCard = require('app/homescreen/cards/YearOverviewCard.jsx');
const ValueDistributionCard = require('app/homescreen/cards/ValueDistributionCard.jsx');
const EndDistributionCard = require('app/homescreen/cards/EndDistributionCard.jsx');
const SeasonsCard = require('app/homescreen/cards/SeasonsCard.jsx');

const HomePage = React.createClass({
  render: function() {
    const t = this.props.t;
    return (
      <BaseLayout
        switcher={this.props.switcher}
        userAgent={this.props.userAgent}
        layoutName="homePage"
        languages={this.props.languages}
        title={t('home:title')} >
        <MUI.GridList cellHeight={'auto'} cols={9} padding={10} >
          <MUI.GridTile style={{padding: '5pt'}} cols={2} >
            <TotalArrowsCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={4} >
            <ValueDistributionCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={3} >
            <EndDistributionCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={5} >
            <SeasonsCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={2} >
            <EventsCard />
          </MUI.GridTile>
          <MUI.GridTile style={{padding: '5pt'}} cols={2} >
            <YearOverviewCard />
          </MUI.GridTile>
        </MUI.GridList>
      </BaseLayout>
    );
  }
});

module.exports = i18nextReact.setupTranslation(['home'], HomePage);
