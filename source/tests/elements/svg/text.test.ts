describe('Text', function () {


it('created text elements should be able to create tspan elements', function() {
  let child = this.element.text(1, 2, ''); // TODO: allow default parameter?
  let tspan = child.tspan('child-tspan');
  chai.expect(tspan.text).to.equal('child-tspan');
  chai.expect(this.element.root.contains(tspan.root));
});

});
