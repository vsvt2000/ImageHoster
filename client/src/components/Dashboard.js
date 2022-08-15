import React, { useState } from 'react';
import "../App.css";
import CreateForm from './CreateForm.js'

export default function Dashboard() {
    const items = [
        {
            id: "abcde",
            tags:
                "meme"
        },
        {
            id: "fghij",
            tags:
                "wholesome"
        }
    ];

    const [upload, setupload] = useState(true);

    return (
        <div class="h-screen bg-slate-600">
            <h1 class="text-3xl font-bold">Hello!</h1>
            <div class="flex items-center justify-center text-center">
                <div>
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">
                                    ID
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Tags
                                </th>
                                <th scope="col" class="py-3 px-6">
                                    Quick Links
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => {
                                return (
                                    <tr>
                                        <td class="py-4 px-6">
                                            {item.id}
                                        </td>
                                        <td class="py-4 px-6">
                                            {item.tags}
                                        </td>
                                        <td class="py-4 px-6">
                                            Links
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setupload(!upload);
                    }}>New</button>
                    {(upload === true) ?
                        <CreateForm />
                        : null
                    }
                </div>
            </div>
        </div>
    );
}