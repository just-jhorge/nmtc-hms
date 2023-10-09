import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./components/Users";
import Records from "./components/Records";

export default function page() {
    return (
        <div className="container pt-24 pb-10">
            <Tabs defaultValue="users">
                <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="records">Records</TabsTrigger>
                </TabsList>
                <TabsContent value="users">
                    <Users />
                </TabsContent>
                <TabsContent value="records">
                    <Records />
                </TabsContent>
            </Tabs>
        </div>
    );
}
