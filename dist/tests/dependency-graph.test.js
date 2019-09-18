/**
* @ignore
*/
import DependencyGraph from '../model/dependency-graph.js';
describe('DependencyGraph', function () {
    describe('constructor', function () {
        it('should construct a dependency graph', function () {
            let dg = new DependencyGraph();
            chai.expect(dg.size()).to.equal(0);
        });
    });
    describe('DependencyGraph.add', function () {
        it('should add a node into the dependency graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            chai.expect(dg.size()).to.equal(1);
            chai.expect(dg.contains('a')).to.equal(true);
        });
        it('should add multiple nodes into the dependency graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.add('c');
            chai.expect(dg.size()).to.equal(3);
            chai.expect(dg.contains('a')).to.equal(true);
            chai.expect(dg.contains('b')).to.equal(true);
            chai.expect(dg.contains('c')).to.equal(true);
        });
        it('should do nothing if an identical node has already been added.', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('a');
            chai.expect(dg.size()).to.equal(1);
        });
    });
    describe('DependencyGraph.remove', function () {
        it('should remove a node from the graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.remove('a');
            chai.expect(dg.size()).to.equal(0);
            chai.expect(dg.contains('a')).to.equal(false);
        });
    });
    describe('DependencyGraph.addDependency', function () {
        it('should add a dependency to the graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.addDependency('a', 'b');
            chai.expect(dg.hasDependents('a')).to.equal(true);
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['b']);
        });
        it('should add a dependency to the graph even if the nodes do not exist', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            chai.expect(dg.hasDependents('a')).to.equal(true);
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['b']);
        });
    });
    describe('DependencyGraph.getDependents', function () {
        it('should return an empty iterable for no dependents', function () {
            let dg = new DependencyGraph();
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal([]);
        });
        it('should throw a circular dependency exception', function () {
            let dg = new DependencyGraph();
            chai.expect(() => { dg.addDependency('a', 'a'); }).to.throw(Error, "circular dependency");
        });
        it('should throw a circular dependency exception', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            chai.expect(() => { dg.addDependency('b', 'a'); }).to.throw(Error, "circular dependency");
        });
        it('should throw a circular dependency exception', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            dg.addDependency('b', 'c');
            chai.expect(() => { dg.addDependency('c', 'a'); }).to.throw(Error, "circular dependency");
        });
        it('should return children dependents', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            dg.addDependency('b', 'c');
            chai.expect(dg.hasDependents('a')).to.equal(true);
            chai.expect(dg.hasDependents('b')).to.equal(true);
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['b', 'c']);
        });
        it('should return children dependents', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            dg.addDependency('a', 'c');
            dg.addDependency('a', 'd');
            dg.addDependency('b', 'c');
            dg.addDependency('b', 'd');
            dg.addDependency('c', 'd');
            chai.expect(dg.hasDependents('a')).to.equal(true);
            chai.expect(dg.hasDependents('b')).to.equal(true);
            chai.expect(dg.hasDependents('c')).to.equal(true);
            chai.expect(dg.hasDependents('d')).to.equal(false);
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['b', 'c', 'd']);
            chai.expect(Array.from(dg.getDependents('b'))).to.deep.equal(['c', 'd']);
            chai.expect(Array.from(dg.getDependents('c'))).to.deep.equal(['d']);
        });
        it('should return dependents in topological ordering', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            dg.addDependency('a', 'c');
            dg.addDependency('b', 'd');
            dg.addDependency('c', 'd');
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['c', 'b', 'd']);
        });
        it('should return dependents in topological ordering', function () {
            let dg = new DependencyGraph();
            dg.addDependency('a', 'b');
            dg.addDependency('a', 'c');
            dg.addDependency('c', 'd');
            dg.addDependency('d', 'b');
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['c', 'd', 'b']);
        });
        it('should return dependents in topological ordering', function () {
            let dg = new DependencyGraph();
            dg.addDependency('d', 'c');
            dg.addDependency('d', 'b');
            dg.addDependency('d', 'a');
            dg.addDependency('c', 'b');
            dg.addDependency('c', 'a');
            dg.addDependency('b', 'a');
            chai.expect(Array.from(dg.getDependents('d'))).to.deep.equal(['c', 'b', 'a']);
        });
    });
    describe('DependencyGraph.toString', function () {
        it('should print out a simple dependency graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.addDependency('a', 'b');
            chai.expect(dg.toString()).to.equal('a->b\n');
        });
        it('should print out a more complicated dependency graph', function () {
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.add('c');
            dg.addDependency('a', 'b');
            dg.addDependency('b', 'c');
            dg.addDependency('a', 'c');
            chai.expect(dg.toString()).to.equal('a->b\na->c\nb->c\n');
        });
    });
    describe('DependenyGraph.Generate', function () {
        it('should be able to create a graph from a string', function () {
            // Create a graph
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.addDependency('a', 'b');
            // Call the generate method and check the generated graph
            let generated = DependencyGraph.Generate(dg.toString());
            chai.expect(generated.contains('a')).to.equal(true);
            chai.expect(generated.contains('b')).to.equal(true);
            chai.expect(generated.hasDependents('a')).to.equal(true);
            chai.expect(Array.from(dg.getDependents('a'))).to.deep.equal(['b']);
        });
        it('should be able to create a graph from a string', function () {
            // Create a graph
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.add('c');
            dg.addDependency('a', 'b');
            dg.addDependency('a', 'c');
            // Call the generate method and check the generated graph
            let generated = DependencyGraph.Generate(dg.toString());
            chai.expect(generated.contains('a')).to.equal(true);
            chai.expect(generated.contains('b')).to.equal(true);
            chai.expect(generated.contains('c')).to.equal(true);
            chai.expect(generated.hasDependents('a')).to.equal(true);
            chai.expect(Array.from(dg.getDependents('a'))).to.include('b');
            chai.expect(Array.from(dg.getDependents('a'))).to.include('c');
        });
    });
    describe('DependencyGraph.getTopologicalSort', function () {
        it('should return "a b c" or "a c b"', function () {
            // Create a graph
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.add('c');
            dg.addDependency('a', 'b');
            dg.addDependency('a', 'c');
            chai.expect(dg.getTopologicalSort().toString()).to.equal('a c b');
        });
        it('should return "a b c" or "a c b"', function () {
            // Create a graph
            let dg = new DependencyGraph();
            dg.add('a');
            dg.add('b');
            dg.add('c');
            dg.addDependency('a', 'b');
            dg.addDependency('b', 'c');
            dg.addDependency('a', 'c');
            console.log(dg.getTopologicalSort());
            chai.expect(dg.getTopologicalSort().toString()).to.equal('a b c');
        });
    });
});
//# sourceMappingURL=dependency-graph.test.js.map