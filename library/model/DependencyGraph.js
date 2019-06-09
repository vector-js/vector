import LinkedList from './LinkedList.js';
/**
A dependency graph models relationships between nodes. The graph is directed and asyclic, throwing a circular dependency exception if circular dependencies are added.
*/
export default class DependencyGraph {
    /**
    Constructs an empty dependency graph.
    */
    constructor() {
        this.relationships = new Map();
        this._size = 0;
    }
    /***
    Adds a node into the dependency graph. If the node already exists within the graph, does nothing.
    */
    add(node) {
        if (!this.contains(node)) {
            this.relationships.set(node, new Set());
            this._size++;
        }
    }
    /**
    Returns true if the node exists within the dependency graph.
    */
    contains(node) {
        return this.relationships.has(node);
    }
    /**
    Removes the node from the dependency graph. If the node does not exist does nothing.
    */
    remove(node) {
        if (this.relationships.delete(node)) {
            this._size--;
        }
    }
    /**
    Returns the number of vertices in the dependency graph.
    */
    size() {
        return this._size;
    }
    /**
    Adds a dependency between two nodes. If either of the nodes do not exist within the dependency graph, throws an exception.
    */
    addDependency(from, to) {
        // Make sure the nodes exist
        this.add(from);
        this.add(to);
        // Add the dependency
        this.relationships.get(from).add(to);
        // Check for circular dependencies
        this.traverse(from, from);
    }
    /**
    Traverses the graph structuring checking for circular dependecies. If a circular dependency is added, throws an error.
    */
    traverse(current, node, visited = new Set()) {
        // Mark this node as visited
        visited.add(current);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(current, true);
        for (let d of dependents) {
            // Check if this dependency causes a circular dependency
            if (d == node) {
                throw new Error("circular dependency");
            }
            // Continue traversing un-explored nodes
            if (!visited.has(d)) {
                this.traverse(d, node, visited);
            }
        }
    }
    /**
    Returns true if a node has dependents.
    */
    hasDependents(node) {
        return this.contains(node) && this.relationships.get(node).size != 0;
    }
    /**
    * Returns an iterator to the dependents of the node.
    */
    getDependents(node, shallow = false) {
        // If the node does not exist return an empty iterable
        if (!this.relationships.has(node)) {
            return [];
        }
        // If shallow, return adjacent dependencies.
        if (shallow) {
            return this.relationships.get(node).keys();
        }
        else {
            // Get the dependents including the original node.
            let list = this.getTopologicalDependents(node);
            // Remove the starting node and return the dependents.
            list.remove();
            return list;
        }
    }
    /**
    Returns a list of the arguent node and all of its dependents in topological order.
    */
    getTopologicalDependents(node, visited = new Set(), list = new LinkedList()) {
        // Mark this node as visited
        visited.add(node);
        // Recursively call this method on dependents of the argument node
        let dependents = this.getDependents(node, true);
        for (let d of dependents) {
            if (!visited.has(d)) {
                this.getTopologicalDependents(d, visited, list);
            }
        }
        // Insert node to the front of iterator to retain Topological ordering
        list.insert(node);
        return list;
    }
    /**
    Returns the nodes within this dependency graph.
    */
    getNodes() {
        return this.relationships.keys();
    }
    /**
    Returns a string representation of this dependency graph.
    */
    toString() {
        // Build a string of dependencies in the form of from->to
        let result = "";
        for (let from of this.getNodes()) {
            for (let to of this.getDependents(from, true)) {
                result += from.toString() + '->' + to.toString() + '\n';
            }
        }
        return result;
    }
    /**
    Generates a DependenyGraph object from a string representation.
    */
    static Generate(str) {
        let graph = new DependencyGraph();
        // Prime the loop
        let start = 0;
        let index = str.indexOf('->', start);
        while (index > 0) {
            // Get the first part of the dependency
            let from = str.substring(start, index);
            // Get the second part of the dependency
            start = index + 1;
            index = str.indexOf('\n', index);
            let to = str.substring(start + 1, index);
            // Add the dependency to the graph
            graph.addDependency(from, to);
            // Get the next string if there is one
            start = index + 1;
            index = str.indexOf('->', start);
        }
        return graph;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGVwZW5kZW5jeUdyYXBoLmpzIiwic291cmNlUm9vdCI6Ii4vc291cmNlLyIsInNvdXJjZXMiOlsibW9kZWwvRGVwZW5kZW5jeUdyYXBoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sVUFBVSxNQUFNLGlCQUFpQixDQUFDO0FBRXpDOztFQUVFO0FBQ0YsTUFBTSxDQUFDLE9BQU8sT0FBTyxlQUFlO0lBU25DOztNQUVFO0lBQ0Y7UUFFQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksR0FBRyxFQUFhLENBQUM7UUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsR0FBRyxDQUFFLElBQU07UUFFVixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDeEI7WUFDQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBRSxJQUFJLEVBQUUsSUFBSSxHQUFHLEVBQUssQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNiO0lBQ0YsQ0FBQztJQUVEOztNQUVFO0lBQ0YsUUFBUSxDQUFFLElBQU07UUFFZixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7TUFFRTtJQUNGLE1BQU0sQ0FBRSxJQUFNO1FBRWIsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFDbkM7WUFDQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDYjtJQUNGLENBQUM7SUFFRDs7TUFFRTtJQUNGLElBQUk7UUFFSCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDbkIsQ0FBQztJQUVEOztNQUVFO0lBQ0YsYUFBYSxDQUFFLElBQU0sRUFBRSxFQUFJO1FBRTFCLDRCQUE0QjtRQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2Ys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QUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNqQztRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2QsQ0FBQztDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmtlZExpc3QgZnJvbSAnLi9MaW5rZWRMaXN0LmpzJztcblxuLyoqXG5BIGRlcGVuZGVuY3kgZ3JhcGggbW9kZWxzIHJlbGF0aW9uc2hpcHMgYmV0d2VlbiBub2Rlcy4gVGhlIGdyYXBoIGlzIGRpcmVjdGVkIGFuZCBhc3ljbGljLCB0aHJvd2luZyBhIGNpcmN1bGFyIGRlcGVuZGVuY3kgZXhjZXB0aW9uIGlmIGNpcmN1bGFyIGRlcGVuZGVuY2llcyBhcmUgYWRkZWQuXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVwZW5kZW5jeUdyYXBoPFQ+XG57XG5cblx0Ly8gU3RvcmVzIHRoZSByZWxhdGlvbnNoaXBzIGJldHdlZW4gbm9kZXNcblx0cHJpdmF0ZSByZWxhdGlvbnNoaXBzIDogTWFwPCBULCBTZXQ8VD4+O1xuXG5cdC8vIEtlZXBzIHRyYWNrIG9mIHRoZSBudW1iZXIgb2Ygbm9kZXMgaW4gdGhpcyBkZXBlbmRlbmN5IGdyYXBoXG5cdHByaXZhdGUgX3NpemUgOiBudW1iZXI7XG5cblx0LyoqXG5cdENvbnN0cnVjdHMgYW4gZW1wdHkgZGVwZW5kZW5jeSBncmFwaC5cblx0Ki9cblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0dGhpcy5yZWxhdGlvbnNoaXBzID0gbmV3IE1hcDxULCBTZXQ8VD4+KCk7XG5cdFx0dGhpcy5fc2l6ZSA9IDA7XG5cdH1cblxuXHQvKioqXG5cdEFkZHMgYSBub2RlIGludG8gdGhlIGRlcGVuZGVuY3kgZ3JhcGguIElmIHRoZSBub2RlIGFscmVhZHkgZXhpc3RzIHdpdGhpbiB0aGUgZ3JhcGgsIGRvZXMgbm90aGluZy5cblx0Ki9cblx0YWRkKCBub2RlOlQgKSA6IHZvaWRcblx0e1xuXHRcdGlmKCAhdGhpcy5jb250YWlucyhub2RlKSApXG5cdFx0e1xuXHRcdFx0dGhpcy5yZWxhdGlvbnNoaXBzLnNldCggbm9kZSwgbmV3IFNldDxUPigpKTtcblx0XHRcdHRoaXMuX3NpemUrKztcblx0XHR9XG5cdH1cblxuXHQvKipcblx0UmV0dXJucyB0cnVlIGlmIHRoZSBub2RlIGV4aXN0cyB3aXRoaW4gdGhlIGRlcGVuZGVuY3kgZ3JhcGguXG5cdCovXG5cdGNvbnRhaW5zKCBub2RlOlQgKSA6IGJvb2xlYW5cblx0e1xuXHRcdHJldHVybiB0aGlzLnJlbGF0aW9uc2hpcHMuaGFzKG5vZGUpO1xuXHR9XG5cblx0LyoqXG5cdFJlbW92ZXMgdGhlIG5vZGUgZnJvbSB0aGUgZGVwZW5kZW5jeSBncmFwaC4gSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QgZG9lcyBub3RoaW5nLlxuXHQqL1xuXHRyZW1vdmUoIG5vZGU6VCApIDogdm9pZFxuXHR7XG5cdFx0aWYgKHRoaXMucmVsYXRpb25zaGlwcy5kZWxldGUobm9kZSkpXG5cdFx0e1xuXHRcdFx0dGhpcy5fc2l6ZS0tO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRSZXR1cm5zIHRoZSBudW1iZXIgb2YgdmVydGljZXMgaW4gdGhlIGRlcGVuZGVuY3kgZ3JhcGguXG5cdCovXG5cdHNpemUoKSA6IG51bWJlclxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NpemU7XG5cdH1cblxuXHQvKipcblx0QWRkcyBhIGRlcGVuZGVuY3kgYmV0d2VlbiB0d28gbm9kZXMuIElmIGVpdGhlciBvZiB0aGUgbm9kZXMgZG8gbm90IGV4aXN0IHdpdGhpbiB0aGUgZGVwZW5kZW5jeSBncmFwaCwgdGhyb3dzIGFuIGV4Y2VwdGlvbi5cblx0Ki9cblx0YWRkRGVwZW5kZW5jeSggZnJvbTpULCB0bzpUKSA6IHZvaWRcblx0e1xuXHRcdC8vIE1ha2Ugc3VyZSB0aGUgbm9kZXMgZXhpc3Rcblx0XHR0aGlzLmFkZChmcm9tKTtcblx0XHR0aGlzLmFkZCh0byk7XG5cblx0XHQvLyBBZGQgdGhlIGRlcGVuZGVuY3lcblx0XHR0aGlzLnJlbGF0aW9uc2hpcHMuZ2V0KGZyb20pLmFkZCh0byk7XG5cblx0XHQvLyBDaGVjayBmb3IgY2lyY3VsYXIgZGVwZW5kZW5jaWVzXG5cdFx0dGhpcy50cmF2ZXJzZSggZnJvbSwgZnJvbSk7XG5cdH1cblxuXHQvKipcblx0VHJhdmVyc2VzIHRoZSBncmFwaCBzdHJ1Y3R1cmluZyBjaGVja2luZyBmb3IgY2lyY3VsYXIgZGVwZW5kZWNpZXMuIElmIGEgY2lyY3VsYXIgZGVwZW5kZW5jeSBpcyBhZGRlZCwgdGhyb3dzIGFuIGVycm9yLlxuXHQqL1xuXHRwcml2YXRlIHRyYXZlcnNlKCBjdXJyZW50OlQsIG5vZGU6VCwgdmlzaXRlZDpTZXQ8VD4gPSBuZXcgU2V0PFQ+KCkpIDogdm9pZFxuXHR7XG5cdFx0Ly8gTWFyayB0aGlzIG5vZGUgYXMgdmlzaXRlZFxuXHRcdHZpc2l0ZWQuYWRkKGN1cnJlbnQpO1xuXG5cdFx0Ly8gUmVjdXJzaXZlbHkgY2FsbCB0aGlzIG1ldGhvZCBvbiBkZXBlbmRlbnRzIG9mIHRoZSBhcmd1bWVudCBub2RlXG5cdFx0bGV0IGRlcGVuZGVudHMgPSB0aGlzLmdldERlcGVuZGVudHMoIGN1cnJlbnQsIHRydWUpO1xuXHRcdGZvciggbGV0IGQgb2YgZGVwZW5kZW50cyApXG5cdFx0e1xuXHRcdFx0Ly8gQ2hlY2sgaWYgdGhpcyBkZXBlbmRlbmN5IGNhdXNlcyBhIGNpcmN1bGFyIGRlcGVuZGVuY3lcblx0XHRcdGlmKCBkID09IG5vZGUgKVxuXHRcdFx0e1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaXJjdWxhciBkZXBlbmRlbmN5XCIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDb250aW51ZSB0cmF2ZXJzaW5nIHVuLWV4cGxvcmVkIG5vZGVzXG5cdFx0XHRpZighdmlzaXRlZC5oYXMoZCkpXG5cdFx0XHR7XG5cdFx0XHRcdHRoaXMudHJhdmVyc2UoZCwgbm9kZSwgdmlzaXRlZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdFJldHVybnMgdHJ1ZSBpZiBhIG5vZGUgaGFzIGRlcGVuZGVudHMuXG5cdCovXG5cdGhhc0RlcGVuZGVudHMoIG5vZGU6VCApIDogYm9vbGVhblxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuY29udGFpbnMobm9kZSkgJiYgdGhpcy5yZWxhdGlvbnNoaXBzLmdldCggbm9kZSkuc2l6ZSAhPSAwO1xuXHR9XG5cblx0LyoqXG5cdCogUmV0dXJucyBhbiBpdGVyYXRvciB0byB0aGUgZGVwZW5kZW50cyBvZiB0aGUgbm9kZS5cblx0Ki9cblx0Z2V0RGVwZW5kZW50cyggbm9kZTpULCBzaGFsbG93OmJvb2xlYW4gPSBmYWxzZSApIDogSXRlcmFibGU8VD5cblx0e1xuXHRcdC8vIElmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0IHJldHVybiBhbiBlbXB0eSBpdGVyYWJsZVxuXHRcdGlmKCAhdGhpcy5yZWxhdGlvbnNoaXBzLmhhcyhub2RlKSlcblx0XHR7XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0Ly8gSWYgc2hhbGxvdywgcmV0dXJuIGFkamFjZW50IGRlcGVuZGVuY2llcy5cblx0XHRpZiggc2hhbGxvdyApXG5cdFx0e1xuXHRcdFx0cmV0dXJuIHRoaXMucmVsYXRpb25zaGlwcy5nZXQobm9kZSkua2V5cygpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gR2V0IHRoZSBkZXBlbmRlbnRzIGluY2x1ZGluZyB0aGUgb3JpZ2luYWwgbm9kZS5cblx0XHRcdGxldCBsaXN0IDogTGlua2VkTGlzdDxUPiA9IHRoaXMuZ2V0VG9wb2xvZ2ljYWxEZXBlbmRlbnRzKCBub2RlICk7XG5cblx0XHRcdC8vIFJlbW92ZSB0aGUgc3RhcnRpbmcgbm9kZSBhbmQgcmV0dXJuIHRoZSBkZXBlbmRlbnRzLlxuXHRcdFx0bGlzdC5yZW1vdmUoKTtcblx0XHRcdHJldHVybiBsaXN0O1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHRSZXR1cm5zIGEgbGlzdCBvZiB0aGUgYXJndWVudCBub2RlIGFuZCBhbGwgb2YgaXRzIGRlcGVuZGVudHMgaW4gdG9wb2xvZ2ljYWwgb3JkZXIuXG5cdCovXG5cdHByaXZhdGUgZ2V0VG9wb2xvZ2ljYWxEZXBlbmRlbnRzKCBub2RlOlQsIHZpc2l0ZWQ6U2V0PFQ+ID0gbmV3IFNldDxUPigpLCBsaXN0OkxpbmtlZExpc3Q8VD4gPSBuZXcgTGlua2VkTGlzdCgpKSA6IExpbmtlZExpc3Q8VD5cblx0e1xuXHRcdC8vIE1hcmsgdGhpcyBub2RlIGFzIHZpc2l0ZWRcblx0XHR2aXNpdGVkLmFkZChub2RlKTtcblxuXHRcdC8vIFJlY3Vyc2l2ZWx5IGNhbGwgdGhpcyBtZXRob2Qgb24gZGVwZW5kZW50cyBvZiB0aGUgYXJndW1lbnQgbm9kZVxuXHRcdGxldCBkZXBlbmRlbnRzID0gdGhpcy5nZXREZXBlbmRlbnRzKCBub2RlLCB0cnVlKTtcblx0XHRmb3IoIGxldCBkIG9mIGRlcGVuZGVudHMgKVxuXHRcdHtcblx0XHRcdGlmKCF2aXNpdGVkLmhhcyhkKSlcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5nZXRUb3BvbG9naWNhbERlcGVuZGVudHMoZCwgdmlzaXRlZCwgbGlzdCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSW5zZXJ0IG5vZGUgdG8gdGhlIGZyb250IG9mIGl0ZXJhdG9yIHRvIHJldGFpbiBUb3BvbG9naWNhbCBvcmRlcmluZ1xuXHRcdGxpc3QuaW5zZXJ0KG5vZGUpO1xuXHRcdHJldHVybiBsaXN0O1xuXHR9XG5cblx0LyoqXG5cdFJldHVybnMgdGhlIG5vZGVzIHdpdGhpbiB0aGlzIGRlcGVuZGVuY3kgZ3JhcGguXG5cdCovXG5cdGdldE5vZGVzKCkgOiBJdGVyYWJsZTxUPlxuXHR7XG5cdFx0cmV0dXJuIHRoaXMucmVsYXRpb25zaGlwcy5rZXlzKCk7XG5cdH1cblxuXHQvKipcblx0UmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGlzIGRlcGVuZGVuY3kgZ3JhcGguXG5cdCovXG5cdHRvU3RyaW5nKCkgOiBzdHJpbmdcblx0e1xuXHRcdC8vIEJ1aWxkIGEgc3RyaW5nIG9mIGRlcGVuZGVuY2llcyBpbiB0aGUgZm9ybSBvZiBmcm9tLT50b1xuXHRcdGxldCByZXN1bHQgPSBcIlwiO1xuXHRcdGZvciggbGV0IGZyb20gb2YgdGhpcy5nZXROb2RlcygpIClcblx0XHR7XG5cdFx0XHRmb3IoIGxldCB0byBvZiB0aGlzLmdldERlcGVuZGVudHMoZnJvbSwgdHJ1ZSkgKVxuXHRcdFx0e1xuXHRcdFx0XHRyZXN1bHQgKz0gZnJvbS50b1N0cmluZygpICsgJy0+JyArIHRvLnRvU3RyaW5nKCkgKyAnXFxuJztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXG5cdC8qKlxuXHRHZW5lcmF0ZXMgYSBEZXBlbmRlbnlHcmFwaCBvYmplY3QgZnJvbSBhIHN0cmluZyByZXByZXNlbnRhdGlvbi5cblx0Ki9cblx0c3RhdGljIEdlbmVyYXRlKCBzdHI6c3RyaW5nICkgOiBEZXBlbmRlbmN5R3JhcGg8c3RyaW5nPlxuXHR7XG5cdFx0bGV0IGdyYXBoID0gbmV3IERlcGVuZGVuY3lHcmFwaDxzdHJpbmc+KCk7XG5cblx0XHQvLyBQcmltZSB0aGUgbG9vcFxuXHRcdGxldCBzdGFydCA9IDA7XG5cdFx0bGV0IGluZGV4ID0gc3RyLmluZGV4T2YoJy0+Jywgc3RhcnQpO1xuXHRcdHdoaWxlKCBpbmRleCA+IDApXG5cdFx0e1xuXHRcdFx0Ly8gR2V0IHRoZSBmaXJzdCBwYXJ0IG9mIHRoZSBkZXBlbmRlbmN5XG5cdFx0XHRsZXQgZnJvbSA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGluZGV4KTtcblxuXHRcdFx0Ly8gR2V0IHRoZSBzZWNvbmQgcGFydCBvZiB0aGUgZGVwZW5kZW5jeVxuXHRcdFx0c3RhcnQgPSBpbmRleCArIDE7XG5cdFx0XHRpbmRleCA9IHN0ci5pbmRleE9mKCdcXG4nLCBpbmRleCk7XG5cdFx0XHRsZXQgdG8gPSBzdHIuc3Vic3RyaW5nKHN0YXJ0ICsgMSwgaW5kZXggKTtcblxuXHRcdFx0Ly8gQWRkIHRoZSBkZXBlbmRlbmN5IHRvIHRoZSBncmFwaFxuXHRcdFx0Z3JhcGguYWRkRGVwZW5kZW5jeShmcm9tLCB0byk7XG5cblx0XHRcdC8vIEdldCB0aGUgbmV4dCBzdHJpbmcgaWYgdGhlcmUgaXMgb25lXG5cdFx0XHRzdGFydCA9IGluZGV4ICsgMTtcblx0XHRcdGluZGV4ID0gc3RyLmluZGV4T2YoJy0+Jywgc3RhcnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBncmFwaDtcblx0fVxufVxuIl19