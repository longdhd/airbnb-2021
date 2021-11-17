import React, { Fragment, useState } from 'react';
import {Switch, Checkbox } from "antd";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

export default function ModalContent() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <Fragment>
            <section className="pb-7 border-b-2 border-gray-100">
                <div>
                  <h2 className="text-2xl font-semibold">Verified places</h2>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-1 min-w-[360px] mt-3">
                    <div className="text-lg">Airbnb Plus</div>
                    <div className="text-gray-500">A selection of places to stay verified for quality and design</div>
                  </div>
                  <div className="col-span-1 flex justify-end items-center">
                    <Switch checkedChildren={<CheckIcon />}/>
                  </div>
                </div>
              </section>
              <section className="mt-5 pb-7 border-b-2 border-gray-100">
                <div>
                  <h2 className="text-2xl font-semibold">More options</h2>
                </div>
                <div className="grid grid-cols-2">
                  <div className="col-span-1 min-w-[360px] mt-3">
                    <div className="text-lg">Superhost</div>
                    <div className="text-gray-500">Stay with recognised hosts</div>
                    <div className="underline font-semibold">Learn more</div>
                  </div>
                  <div className="col-span-1 flex justify-end items-center">
                    <Switch checkedChildren={<CheckIcon />}/>
                  </div>
                </div>
              </section>
              <section className="mt-5 pb-7 border-b-2 border-gray-100">
                <div className="pb-5">
                  <h2 className="text-2xl font-semibold">Accessibility features</h2>
                </div>
                {isOpen && <Fragment><p className="text-gray-500" style={{fontSize:'1rem'}}>This info was provided by the Host and reviewed by Airbnb.</p>
                <h3 className="font-semibold mb-5" style={{fontSize:'1rem'}}>Guest entrance and parking</h3></Fragment>}
                <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-y-4 pb-5">
                    <div><Checkbox style={{fontSize:'1rem'}}>Step-free guest entrance</Checkbox></div>
                    <div><Checkbox style={{fontSize:'1rem'}}>Accessible parking spot</Checkbox></div>
                    <div><Checkbox style={{fontSize:'1rem'}}>Guest entrance wider than 32 inches (81 centimetres)</Checkbox></div>
                    <div><Checkbox style={{fontSize:'1rem'}}>Step-free path to the guest entrance</Checkbox></div>
                </div>
                {isOpen && <Fragment>
                    <h3 className="font-semibold mb-5" style={{fontSize:'1rem'}}>Bedroom</h3>
                    <div className="grid grid-flow-col grid-cols-2 grid-rows-1 gap-y-4 pb-5">
                        <div><Checkbox style={{fontSize:'1rem'}}>Step-free bedroom access</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Bedroom entrance wider than 32 inches (81 centimetres)</Checkbox></div>
                    </div>
                    <h3 className="font-semibold mb-5" style={{fontSize:'1rem'}}>Bathroom</h3>
                    <div className="grid grid-cols-2 grid-rows-2 gap-y-4 pb-5">
                        <div><Checkbox style={{fontSize:'1rem'}}>Step-free bathroom access</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Bathroom entrance wider than 32 inches (81 centimetres)</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Shower grab bar</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Toilet grab bar</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Step-free shower</Checkbox></div>
                        <div><Checkbox style={{fontSize:'1rem'}}>Shower or bath chair</Checkbox></div>
                    </div>
                    <h3 className="font-semibold mb-5" style={{fontSize:'1rem'}}>Adaptive equipment</h3>
                    <div className="mb-3"><Checkbox value="step" style={{fontSize:'1rem'}}>Ceiling or mobile hoist</Checkbox></div>
                    </Fragment>}
                <p className="font-semibold underline cursor-pointer hover:text-black" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <div className="flex"><span>Show less</span><ChevronUpIcon className="h-5 ml-1 pt-1"/></div> : <div className="flex"><span>Show all accessibility features</span><ChevronDownIcon className="h-5 ml-1 pt-1"/></div>}</p>
              </section>
        </Fragment>
    )
}
