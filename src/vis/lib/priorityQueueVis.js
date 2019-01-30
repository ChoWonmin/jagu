/**
 * @copyright 2019 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description priority queue visualization library
 * @param {Object} [renderer] d3 render object
 * @param {Object} [datastructure] jagu datastructure
 */

const priorityQueueVis = (renderer, datastructure) => {

  const root = renderer;
  const backgroundG = root.append('g');
  const foregroundG = root.append('g');
  const activeG = root.append('g');

  const width = root.node().getBoundingClientRect().width;

  const height = root.node().getBoundingClientRect().height;

  const data = datastructure;

  let lock = false;

  const margin = 30;

  const boxProps = {
    width: 140,
    height: 30,
    color: '#ff6f74',
    fontColor: '#dedede',
    padding: 6
  };

  const duration = 1000;

  const drawBox = (x, y, text) => {
    const rect = foregroundG.append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', boxProps.width - 2 * boxProps.padding)
      .attr('height', boxProps.height)
      .attr('fill', '#eee17f')
      .attr('opacity', 1);

    const t = foregroundG.append('text')
      .attr('x', x + boxProps.width/2 - 4)
      .attr('y', y + boxProps.height/2)
      .attr('fill', '#4b4b4b')
      .attr('alignment-baseline', 'middle')
      .attr('text-anchor', 'middle')
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
      .attr('width', boxProps.width)
      .attr('height', height)
      .attr('fill', '#adefde');

    data.toArray().forEach( (e,i) => {
      const box = drawBox(margin + boxProps.padding, height - (boxProps.height + boxProps.padding) * (i+1), e);

      box.rect
        .transition()
        .duration(duration)
        .attr('fill', boxProps.color);

      box.text
        .transition()
        .duration(duration)
        .attr('fill', boxProps.fontColor);
    });

    scroll(foregroundG);
  };

  const enqueue = (ele, priority) => {
    data.enqueue(ele, priority);
    draw();
  };

  const dequeue = () => {
    data.dequeue();

    const front = {
      rect: foregroundG.selectAll('rect').filter((d,i) => i===0),
      text: foregroundG.selectAll('text').filter((d,i) => i===0)
    };

    front.rect.transition()
      .duration(duration)
      .attr('y', height);

    front.text.transition()
      .duration(duration)
      .attr('y', height)
      .on('end', () => {
        front.rect.remove();
        front.text.remove();

        foregroundG.selectAll('rect').transition()
          .delay(duration)
          .duration(duration)
          .attr('y', (e,i) => height - (boxProps.height + boxProps.padding) * (i+1));

        foregroundG.selectAll('text').transition()
          .delay(duration)
          .duration(duration)
          .attr('y', (e,i) => height + boxProps.height/2 - (boxProps.height + boxProps.padding) * (i+1));

      });

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

export default priorityQueueVis;