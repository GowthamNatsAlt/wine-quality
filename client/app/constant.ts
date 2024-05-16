import { nan, z } from 'zod';

export interface inputInterface {
  // name: string,
  name: "fixed_acidity" | "volatile_acidity" | "citric_acid" | "residual_sugar" | "chlorides" | "free_sulfur_dioxide" | "total_sulfur_dioxide" | "density" | "pH" | "sulphates" | "alcohol",
  min_value: number,
  max_value: number,
  description: string
};

// Dictionary of all values
export const inputsNecessary: inputInterface[] = [
  {
    name: "fixed_acidity",
    min_value: 0,
    max_value: 16,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "volatile_acidity",
    min_value: 0,
    max_value: 1.58,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "citric_acid",
    min_value: 0,
    max_value: 1.0,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "residual_sugar",
    min_value: 0.9,
    max_value: 15.5,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "chlorides",
    min_value: 0,
    max_value: 0.7,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "free_sulfur_dioxide",
    min_value: 0,
    max_value: 72,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "total_sulfur_dioxide",
    min_value: 6,
    max_value: 289,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "density",
    min_value: 0.98,
    max_value: 1.1,
    description: "Measured in grams per milliliter (g/ml)",
  },
  {
    name: "pH",
    min_value: 2.5,
    max_value: 4.5,
    description: "Unitless",
  },
  {
    name: "sulphates",
    min_value: 0,
    max_value: 2,
    description: "Measured in grams per liter (g/L)",
  },
  {
    name: "alcohol",
    min_value: 8,
    max_value: 15,
    description: "Measured in percent (%)",
  },
];

// Form Schema and validation
export const formSchema = z.object({
  fixed_acidity: z.coerce.number({ invalid_type_error: 'Invalid number.' }).multipleOf(0.01)
                  .min(0, {
                    message: "Fixed acidity of Vinho Verde can't go below 0 g/L."
                  })
                  .max(16, {
                    message: "Fixed acidity of Vinho Verde doesn't exceed 16 g/L."
                  }),
  volatile_acidity: z.coerce.number({ invalid_type_error: 'Invalid number.' }).multipleOf(0.01)
                  .min(0, {
                     message: "Volatile acidity of Vinho Verde can't be lower than 0 g/L."
                  })
                  .max(1.58, {
                     message: "Volatile acidity of Vinho Verde doesn't exceed 1.58 g/L."
                  }),
  citric_acid: z.coerce.number({ invalid_type_error: 'Invalid number.' }).multipleOf(0.01)
                  .min(0, { 
                     message: "Citric acid content in Vinho Verde can't be below 0 g/L."
                  })
                  .max(1.0, { 
                     message: "Citric acid content in Vinho Verde typically doesn't exceed 1 g/L."
                  }),
  residual_sugar: z.coerce.number().multipleOf(0.01)  
                  .min(0.9, { 
                      message: "Residual sugar in Vinho Verde is typically at least 0.9 g/L."
                  })
                  .max(15.5, {
                      message: "Residual sugar level in Vinho Verde can't be higher than 15.5 g/L."
                  }),
  chlorides: z.coerce.number().multipleOf(0.01) 
            .min(0, {
                message: "Chloride content in Vinho Verde can't be lower than 0 g/L."
            })
            .max(0.7, { 
                message: "Chloride content in Vinho Verde typically doesn't exceed 0.7 g/L."
            }),
  free_sulfur_dioxide: z.coerce.number().multipleOf(0.01) 
                      .min(0, {
                          message: "Free sulfur dioxide content in Vinho Verde can't be lower than 0 g/L."
                      })
                      .max(72, {  
                          message: "Free sulfur dioxide content in Vinho Verde can't exceed 72 g/L."
                      }),
  total_sulfur_dioxide: z.coerce.number().multipleOf(0.01) 
                        .min(6, {
                          message: "Total sulfur dioxide content in Vinho Verde generally isn't lower than 6 g/L."
                        })
                        .max(289, { 
                          message: "Total sulfur dioxide content in Vinho Verde can't exceed 289 g/L."
                        }),
  density: z.coerce.number().multipleOf(0.01)
                  .min(0.98, {
                      message: "Density of Vinho Verde can't be lower than 0.98 g/cm3."
                  })
                  .max(1.1, {
                      message: "Density of Vinho Verde can't be higher than 1.1 g/cm3."
                  }),
  pH: z.coerce.number().multipleOf(0.01)
      .min(2.5, {
          message: "pH of Vinho Verde can't be lower than 2.5."
      })
      .max(4.5, {
          message: "pH of Vinho Verde can't be higher than 4.5."
      }),
  sulphates: z.coerce.number().multipleOf(0.01)
            .min(0, {
                message: "Sulfate content in Vinho Verde can't be lower than 0 g/L."
            })
            .max(2, {  
                message: "Sulfate content in Vinho Verde can't exceed 2 g/L."
            }),        
  alcohol: z.coerce.number().multipleOf(0.01)
         .min(8, {
            message: "Alcohol content in Vinho Verde can't be lower than 8 %."
         })
         .max(15, {  
            message: "Alcohol content in Vinho Verde can't be higher than 15 %."
         }),      
})
// .refine(data => data.free_sulfur_dioxide >= data.total_sulfur_dioxide, {
//   message: "Free sulphur dioxide should always be lesser than total sulphur dioxide.",
//   path: ['free_sulphur_dioxide', 'total_sulphur_dioxide']
// });