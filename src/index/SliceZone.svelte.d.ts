/** @typedef {typeof __propDef.props}  SliceZoneProps */
/** @typedef {typeof __propDef.events}  SliceZoneEvents */
/** @typedef {typeof __propDef.slots}  SliceZoneSlots */
export default class SliceZone extends SvelteComponentTyped<{
    body: any;
    slices: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {}> {
}
export type SliceZoneProps = typeof __propDef.props;
export type SliceZoneEvents = typeof __propDef.events;
export type SliceZoneSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        body: any;
        slices: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export {};
