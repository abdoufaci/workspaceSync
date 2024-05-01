"use client";
import React, { useEffect, useState } from "react";
import { HeroParallax } from "../ui/hero-parallax";

export function HeroParallaxAni() {
  return <HeroParallax products={products} />;
}
export const products = [
  {
    title: "Add task",
    link: "/",
    thumbnail:
      "https://utfs.io/f/b2d0d628-5d9f-48f5-9303-d1790b3b5107-l79vwv.jpg",
  },
  {
    title: "Edit project",
    link: "/",
    thumbnail:
      "https://utfs.io/f/85d3c2a1-36e1-47c7-998a-18f47ef3365d-gqbve2.jpg",
  },
  {
    title: "Members",
    link: "/",
    thumbnail:
      "https://utfs.io/f/eb9b51a2-63c3-4280-be31-48f7610fdc1f-foxtsp.jpg",
  },

  {
    title: "Messages",
    link: "/",
    thumbnail:
      "https://utfs.io/f/fb45677e-56f0-492c-ab32-a2271b91e603-7n4a0k.jpg",
  },
  {
    title: "Project",
    link: "/",
    thumbnail:
      "https://utfs.io/f/47155c6d-87d8-4eef-8e4a-dfcc094ced0e-545lnr.jpg",
  },
  {
    title: "Projects",
    link: "/",
    thumbnail:
      "https://utfs.io/f/f583f3a6-5f1f-44c4-a83f-d901ef6ab9bc-giljeu.jpg",
  },

  {
    title: "Task details",
    link: "/",
    thumbnail:
      "https://utfs.io/f/9ac2aa68-630a-42ca-941b-7286c544e48b-gp2fwa.jpg",
  },
  {
    title: "Add task",
    link: "/",
    thumbnail:
      "https://utfs.io/f/b2d0d628-5d9f-48f5-9303-d1790b3b5107-l79vwv.jpg",
  },
  {
    title: "Edit project",
    link: "/",
    thumbnail:
      "https://utfs.io/f/85d3c2a1-36e1-47c7-998a-18f47ef3365d-gqbve2.jpg",
  },
  {
    title: "Members",
    link: "/",
    thumbnail:
      "https://utfs.io/f/eb9b51a2-63c3-4280-be31-48f7610fdc1f-foxtsp.jpg",
  },
  {
    title: "Add task",
    link: "/",
    thumbnail:
      "https://utfs.io/f/b2d0d628-5d9f-48f5-9303-d1790b3b5107-l79vwv.jpg",
  },

  {
    title: "Add task",
    link: "/",
    thumbnail:
      "https://utfs.io/f/b2d0d628-5d9f-48f5-9303-d1790b3b5107-l79vwv.jpg",
  },
  {
    title: "Members",
    link: "/",
    thumbnail:
      "https://utfs.io/f/eb9b51a2-63c3-4280-be31-48f7610fdc1f-foxtsp.jpg",
  },

  {
    title: "messages",
    link: "/",
    thumbnail:
      "https://utfs.io/f/fb45677e-56f0-492c-ab32-a2271b91e603-7n4a0k.jpg",
  },
  {
    title: "Project",
    link: "/",
    thumbnail:
      "https://utfs.io/f/47155c6d-87d8-4eef-8e4a-dfcc094ced0e-545lnr.jpg",
  },
];
