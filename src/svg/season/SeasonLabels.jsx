var React = require('react');

module.exports = React.createClass({
  render: function() {
    return (
      <g id='labels' transform={'translate(5,-'+this.props.max+')'}>
        <rect className='plan' x='0' y={(1*this.props.max/10-25)} height='20' width='100' />
        <text className='graph_label' x='125' y={(1*this.props.max/10-2)}>Text['total_plan']</text>
        <rect className='training' x='0' y={(2*this.props.max/10-25)} height='20' width='100' />
        <text className='graph_label' x='125' y={(2*this.props.max/10-2)}>Text['technique_totals']</text>
        <rect className='target' x='0' y={(3*this.props.max/10-25)} height='20' width='100' />
        <text className='graph_label' x='125' y={(3*this.props.max/10-2)}>Text['target_totals']</text>
        <rect className='share-shadow' x='5' y={(4*this.props.max/10-25)} height='20' width='100' />
        <rect className='share' y={(4*this.props.max/10-5-25)} height='20' width='100' />
        <text className='graph_label' x='125' y={(4*this.props.max/10-2)}>Text['technique_share']</text>
        <path className='estimation' d={'M 0,'+(5*this.props.max/10-12.5)+' l 100,0'}/>
        <circle className='result' cx='50' cy={(5*this.props.max/10-12.5)} r='10'/>
        <text className='graph_label' x='125' y={(5*this.props.max/10-2)}>Text['result_totals']</text>
        <circle className='strength' cx='50' cy={(6*this.props.max/10-12.5)} r='10'/>
        <text className='graph_label' x='125' y={(6*this.props.max/10-2)}>Text['strength_training']</text>
      </g>
    );
  }
});