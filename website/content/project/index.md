---
title: Project Overview
description: This project was developed as a capstone project for a group of seniors studying computer science at the Uniersity of Utah.
draft: true
---

This project was developed as a capstone project for a group of seniors studying computer science at the Uniersity of Utah.

## Abstract

Vector.js is an open source Javascript library for creating interactive vector graphics. The library uses existing web standards: HTML, SVG, CSS, and geoJSON making it easy to use with existing tools and libraries. The target audience for the library is technical users who want to create "interactive" content for the web. An interactive is a vector based image that changes on user input to display additional information, visualize a concept, or more generally, provides the end-user with an engaging experience.

The library component of our software system is composed of elements. Each element is defined as a Javascript object and corresponds to a SVG component accessed through the "root" property. These elements are intended to be "wrappers" that expose the right amount of functionality for our users - enough to be easy to use and useful, but not overly complex and cumbersome. This distinction is in part motivated by the lengthy amount of time it takes to create something like an interactive SVG map with the existing tools.

The website component of our software system will host the library and provide the following: an overview of the project, documentation, examples, tutorials, and a sandbox editor. The website is critical to the approachability and usability factor of our software system. The content is geared towards increasing the usability of our library and specifically decreasing the time cost associated with creating an interactive. For example, we plan to provide a sandbox editor that can open and run examples for the user all in one place. This allows the user to find something that is close to what they hope to do and modify it.

## Technologies

- Web APIs (DOM)
- SVG Specificiation
- Typescript
- Mocha
- Hugo
- Github Pages

## Library

The library is implemented around the SVG specification.

### Basic Elements

Our library has basic visual elements that are used to create the graphics. All elements contain a root SVGElement that contains the visual part of the element. Basic element root’s correspond directly to the visual aspect of the element, more complicated elements often contain many SVGElements that describe the graphic.

{{<example "ellipse-element">}}
{{<example "path-element">}}
{{<example "rectangle-element">}}

### Input Elements

Input elements and mouse interaction are the primary way that end-users of the library interact with the visual. Each input element is part of the SVG ecosystem and surface controls to the user.

{{<example "control-element">}}
{{<example "radio-control-element">}}
{{<example "scrubber-element">}}

## Modules

There are three main modules of our library: maps, graph structures, and function plots. Each demonstrates how the core library can be leveraged to implement more complex and sophisticated interactive visuals.

### Maps

{{<example "world-map">}}

### Graphs

### Plots

{{<example "plot-element">}}

## Website

- Documentation
- Examples
- Tutorials

## API

## Features
