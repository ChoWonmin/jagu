/**
 * @copyright 2019 ChoWonmin <0108257@gmail.com>
 * @license MIT
 * @description datastructure visualization library
 * @param {Object} [renderer] d3 render object
 * @param {Object} [datastructure] jagu datastructure
 */

const stackVis = (renderer, data) => {

  this.root = renderer;
  this.backgroundG = this.root.append('g');
  this.foregroundG = this.root.append('g');
  this.activeG = this.root.append('g');

  /**
   * canvas width
   * @property {number}
   */
  this.width = this.root.node().getBoundingClientRect().width;
  /**
   * canvas height
   * @property {number}
   */
  this.height = this.root.node().getBoundingClientRect().height;

  this.data = data;

  this.margin = 30;
  this.padding = 6;
  this.stackBox = {
    width: 140,
    height: 30,
    color: '#ff6f74',
    fontColor: '#dedede'
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

    this.backgroundG.append('rect')
      .attr('x', this.margin)
      .attr('y', 0)
      .attr('width', this.stackBox.width)
      .attr('height', this.height)
      .attr('fill', '#adefde');

    this.data.toArray().forEach( (e,i) => {

      this.foregroundG.append('rect')
        .attr('x', this.margin + this.padding)
        .attr('y', this.height - (this.stackBox.height + this.padding) * (i+1) )
        .attr('width', this.stackBox.width - 2 * this.padding)
        .attr('height', this.stackBox.height)
        .attr('fill', this.stackBox.color)
        .attr('opacity', 1);

      console.log(this.height - (this.stackBox.height + this.padding) * (i+1));

      this.foregroundG.append('text')
        .attr('x', this.margin + this.stackBox.width/2)
        .attr('y', this.height + this.stackBox.height/2 - (this.stackBox.height + this.padding) * (i+1))
        .attr('fill', this.stackBox.fontColor)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text(e);
    });

    scroll(this.foregroundG);
  };

  const push = (ele) => {
    this.data.push(ele);

    const top = this.foregroundG.selectAll('rect').filter((d,i,list) => i === list.length-1);

    // .transition()
    //   .delay(300)
    //   .duration(500)
    //   .attr('y', 0);

    console.log(top.node().getBoundingClientRect());

    this.foregroundG.append('rect')
      .attr('x', this.margin + this.padding)
      .attr('y', 0)
      .attr('width', this.stackBox.width - 2 * this.padding)
      .attr('height', this.stackBox.height)
      .attr('fill', this.stackBox.color)
      .attr('opacity', 1)
      .transition()
      .delay(500)
      .duration(800)
      .attr('y', this.height - (this.stackBox.height + this.padding) * (this.data.toArray().length));

    this.foregroundG.append('text')
      .attr('x', this.margin + this.stackBox.width/2)
      .attr('y', 0 + this.stackBox.height/2)
      .attr('fill', this.stackBox.fontColor)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .text(ele)
      .transition()
      .delay(500)
      .duration(800)
      .attr('y', this.height + this.stackBox.height/2 - (this.stackBox.height + this.padding) * (this.data.toArray().length));
  };

  const pop = () => {
    this.data.pop();
    draw();
  };

  const clear = () => {
    this.backgroundG.selectAll('*').remove();
    this.foregroundG.selectAll('*').remove();
    this.activeG.selectAll('*').remove();
  };

  return {
    draw,
    push,
    clear
  }

};