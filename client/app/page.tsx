"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from 'next/link'

// Heading font import
import { Yeseva_One } from "next/font/google";

// Form imports
import { string, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchema, inputsNecessary } from "./constant";

const yeseva_one = Yeseva_One({ weight: "400", subsets: ['latin'] });

function convertToTitleCase(str: String) {
  if (str !== "pH") {
    str = str.split("_").join(" ");
    return str.replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  }
  return str;
}

export default function Home() {
  const [wine, setWine] = useState<string | null>(null);
  const router = useRouter();

  // Form resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fixed_acidity: 8.0,
      volatile_acidity: 0.79,
      citric_acid: 0.5,
      residual_sugar: 8.2,
      chlorides: 0.35,
      free_sulfur_dioxide: 36,
      total_sulfur_dioxide: 141.5,
      density: 1.04,
      pH: 3.5,
      sulphates: 1.0,
      alcohol: 11.5
    },
  });

  // Form submit function
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (process.env.NEXT_PUBLIC_ENDPOINT) {
      await toast.promise(
        axios.post(process.env.NEXT_PUBLIC_ENDPOINT, values)
          .then((response) => {
            setWine(response.data.wine_quality);
            router.push("#results");
          })
          .catch((err) => console.error(err))
        , 
        {
          loading: "Analyzing wine macros.",
          success: "Wine analysis successful.",
          error: (err) => `This just happened: ${err.toString()}`,
        }
      )
    } else {
      toast.error("Client isn't connected to server");
    }
  }

  return (
    <main>
      {/* Take input values */}
      <section id="analyze" className="lg:w-screen lg:h-screen flex flex-col justify-center items-center text-center p-20 gap-6">
          <h1 className={`${yeseva_one.className} lg:text-8xl md:text-6xl text-4xl text-[#A91D3A]`}>Red Wine Analyzer</h1>
          <p className="lg:text-xl md:text-lg text-md mb-4">A machine learning-based application which predicts the quality of red wine variant of the Vinho Verde using scientific macros.</p>
          
          {/* Form Component */}
          <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full gap-x-12 gap-y-8 grid lg:grid-rows-4 md:grid-rows-6 grid-rows-12 grid-flow-col-dense auto-cols-fr items-center">
                {
                  inputsNecessary.map((criterion, key) => (
                    <FormField
                      key={key}
                      control={form.control}
                      name={criterion.name}
                      render={({ field: { value, onChange } }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">{convertToTitleCase(criterion.name)}</FormLabel>
                          <div className="flex flex-row justify-around items-center border-2 border-[#A91D3A] rounded-md">
                            <p className="w-1/5 p-2 bg-[#A91D3A] text-[#EEEEEE]">{criterion.min_value}</p>
                            <FormControl>
                                <Input 
                                  type="number"
                                  step={0.01}
                                  className="text-center rounded-none border-y-0 border-x-2 border-[#A91D3A]" 
                                  value={value} 
                                  onChange={event => onChange(event.target.value == "" ? "" : parseFloat(event.target.value))} 
                                />
                            </FormControl>
                            <p className="w-1/5 p-2 bg-[#A91D3A] text-[#EEEEEE]">{criterion.max_value}</p>
                          </div>
                          <FormDescription>
                            {criterion.description}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))
                }
                <Button type="submit" className="h-[45px] bg-[#A91D3A] w-full relative top-1">Analyze</Button>
              </form>
          </Form>
      </section>
      
      {/* Results section */}
      {
        wine && (
          <section id="results" className="w-screen h-screen flex flex-col justify-center items-center text-center p-20 gap-6">
             <h1 className={`${yeseva_one.className} lg:text-8xl md:text-6xl text-4xl text-[#A91D3A]`}>Analysis: {wine} wine.</h1>
             <Link className="h-[45px] bg-[#A91D3A] w-[300px] text-white flex items-center justify-center rounded-md" href="#analysis">Try Again</Link>
          </section>
        )
      }

    </main>
  );
}