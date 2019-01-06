/**
 * @copyright 2019 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description datastructure visualization library
 * @param {Object} [renderer] d3 render object
 * @param {Object} [datastructure] jagu datastructure
 */

const queueVis = (renderer, datastructure) => {

  const root = renderer;
  const backgroundG = root.append('g');
  const foregroundG = root.append('g');
  const activeG = root.append('g');

  const width = root.node().getBoundingClientRect().width;

  const height = root.node().getBoundingClientRect().height;

  const data = datastructure;

  const margin = 30;

  const stackBox = {
    width: 140,
    height: 30,
    color: '#ff6f74',
    fontColor: '#dedede',
    padding: 6
  };

  const duration = 700;

  const drawBox = (x, y, text) => {
    const rect = foregroundG.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', stackBox.width - 2 * stackBox.padding)
      .attr('height', stackBox.height)
      .attr('fill', stackBox.color)
      .attr('opacity', 1);

    const t = foregroundG.append('text')
      .attr('x', x + stackBox.width/2)
      .attr('y', y + stackBox.height/2)
      .attr('fill', stackBox.fontColor)
      .attr('alignment-baseline', 'middle')
      .text(text);

    return {
      rect,
      text: t
    };
  };

  const scroll = (target) => {
    let startY = 0;
    let diffY = 0;
    let moveY = 0;

    target.call(d3.drag()
      .on('start', ()=>{
        startY = d3.event.y;
      }).on('drag', ()=>{
        diffY = d3.event.y - startY;

        if (moveY + diffY <= 0) {
          diffY = 0;
        } else {
          target.selectAll('*').attr('transform', `translate(0, ${moveY + diffY})`);
        }
      }).on('end', ()=>{
        startY = 0;
        moveY += diffY;
        diffY = 0;
      }));
  };

  const draw = () => {
    clear();

    backgroundG.append('rect')
      .attr('x', margin)
      .attr('y', 0)
      .attr('width', stackBox.width)
      .attr('height', height)
      .attr('fill', '#adefde');

    data.toArray().forEach( (e,i) => {
      drawBox(margin + stackBox.padding, height - (stackBox.height + stackBox.padding) * (i+1), e);
    });

    scroll(foregroundG);
  };

  const enqueue = (ele) => {
    data.enqueue(ele);

    foregroundG.append('rect')
      .attr('x', margin + stackBox.padding)
      .attr('y', 0)
      .attr('width', stackBox.width - 2 * stackBox.padding)
      .attr('height', stackBox.height)
      .attr('fill', stackBox.color)
      .attr('opacity', 1)
      .transition()
      .duration(duration)
      .attr('y', height - (stackBox.height + stackBox.padding) * (data.toArray().length));

    foregroundG.append('text')
      .attr('x', margin + stackBox.width/2)
      .attr('y', 0 + stackBox.height/2)
      .attr('fill', stackBox.fontColor)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(ele)
      .transition()
      .duration(duration)
      .attr('y', height + stackBox.height/2 - (stackBox.height + stackBox.padding) * (data.toArray().length))
      .on('end', ()=>{draw()});

  };

  const dequeue = () => {

    data.dequeue();

    const top = {
      rect: foregroundG.selectAll('rect').filter((d,i,list) => i===list.length-1),
      text: foregroundG.selectAll('text').filter((d,i,list) => i===list.length-1)
    };

    top.rect.transition()
      .duration(duration)
      .attr('y', - stackBox.height);

    top.text.transition()
      .duration(duration)
      .attr('y', - stackBox.height)
      .on('end', ()=>{draw()});

  };

  const clear = () => {
    backgroundG.selectAll('*').remove();
    foregroundG.selectAll('*').remove();
    activeG.selectAll('*').remove();
  };

  return {
    draw,
    enqueue,
    dequeue,
    clear
  }

};

export default queueVis;
