"use client";

import { ListItem } from "@/app/page";
import { motion, AnimatePresence } from "framer-motion";
import { memo, useCallback, useState } from "react";
import "./AnimatedList.css";
import Image from "next/image";
import Link from "next/link";

export const AnimatedList = (props: { list: ListItem[] }) => {
  const [items, setItems] = useState<ListItem[]>(props.list);

  const removeItem = useCallback((iso_code3: string) => {
    setItems(prevItems =>
      prevItems.filter(item => item.iso_code3 !== iso_code3)
    );
  }, []);

  return (
    <div className="list-container">
      <ul className="list">
        <AnimatePresence>
          {items.map(item => (
            <FlagItem
              key={item.iso_code3}
              item={item}
              removeItem={removeItem}
            />
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
};

interface IFlagItemProps {
  item: ListItem;
  removeItem: (iso_code3: string) => void;
}

const FlagItem = memo((props: IFlagItemProps) => {
  console.log("render");

  return (
    <motion.li
      className="item"
      initial={{ opacity: 1, x: 0 }}
      exit={{
        opacity: 0,
        x: 100,
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.2 }}
      layout
    >
      <FlagImage
        flag_url={props.item.flag_url}
        iso_code2={props.item.iso_code2}
      />
      <div className="name">{props.item.name_ru}</div>

      <div className="item-nav">
        <Link href={"/" + props.item.iso_code3}>
          <button className="about-btn">Подробнее</button>
        </Link>
        <button
          className="delete-btn"
          onClick={() => props.removeItem(props.item.iso_code3)}
        >
          Удалить
        </button>
      </div>
    </motion.li>
  );
});

const FlagImage = memo((props: { flag_url?: string; iso_code2: string }) => {
  return (
    <div className="img-container">
      {props.flag_url ? (
        <Image
          src={
            props.flag_url.startsWith("//")
              ? `https:${props.flag_url}`
              : props.flag_url
          }
          width={22}
          height={14}
          alt={props.iso_code2 || "Country flag"}
          onError={e => {
            const target = e.currentTarget;
            console.log(target.src);

            if (!target.src.includes("placehold.co")) {
              target.srcset = "https://placehold.co/22x14";
              target.src = "https://placehold.co/22x14";
              target.onerror = null;
            }
          }}
          loading="lazy"
        />
      ) : (
        <Image
          src="https://placehold.co/22x14.png"
          width={22}
          height={14}
          alt={props.iso_code2 || "Country flag"}
          loading="lazy"
        />
      )}
    </div>
  );
});
