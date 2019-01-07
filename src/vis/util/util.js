/**
 * @copyright 2019 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description util for draw and move d3 object
 */

const util = () => {

  const drawShape = (renderer, x, y, text, properties = {}, shape = 'rect') => {
    const props = {
      width: properties.width || 140,
      height: properties.height || 30,
      color: properties.color || '#ff6f74',
      fontColor: properties.fontColor || '#dedede',
    };

    const box = {
      rect: undefined,
      text: undefined
    };

    box.rect = root.append(shape)
      .attr('x', x)
      .attr('y', y)
      .attr('width', props.width - 2 * props.padding)
      .attr('height', props.height)
      .attr('fill', props.color)
      .attr('opacity', 1);

    box.text = root.append('text')
      .attr('x', x + props.width/2)
      .attr('y', y + props.height/2)
      .attr('fill', props.fontColor)
      .attr('alignment-baseline', 'middle')
      .text(text);

    return box;
  };

  const move = (shape, x, y, transition = {}) => {
    const transitionProps = {
      duration: transition || 700
    };

    shape.rect
      .transition()
      .duration(transitionProps.duration)
      .attr('x', x)
      .attr('y', y);

    shape.text
      .transition()
      .duration(transitionProps.duration)
      .attr('x', x)
      .attr('y', y + props.height/2)
      .on('end', ()=>{draw()});

  };

  return {
    drawShape,
    move,
  };

};

export default util();
