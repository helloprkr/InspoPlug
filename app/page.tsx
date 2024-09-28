"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveAs } from 'file-saver'

const googleFonts = [
  "Arial", "Helvetica", "Times New Roman", "Courier New", "Verdana", 
  "Georgia", "Palatino", "Garamond", "Bookman", "Comic Sans MS", 
  "Trebuchet MS", "Arial Black", "Impact"
]

export default function LumosStyleGuideGenerator() {
  const [fontFamily, setFontFamily] = useState('Arial')
  const [brandColor, setBrandColor] = useState('#c6fb50')
  const [textColor, setTextColor] = useState('#353233')
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const [lightColor, setLightColor] = useState('#ffffff')
  const [darkColor, setDarkColor] = useState('#353233')
  const [displaySize, setDisplaySize] = useState(7)
  const [h1Size, setH1Size] = useState(5)
  const [h2Size, setH2Size] = useState(4)
  const [h3Size, setH3Size] = useState(3)
  const [h4Size, setH4Size] = useState(2)
  const [h5Size, setH5Size] = useState(1.5)
  const [h6Size, setH6Size] = useState(1)
  const [bodySize, setBodySize] = useState(1)
  const [letterSpacing, setLetterSpacing] = useState(-0.03)
  const [spacing, setSpacing] = useState(1)
  const [padding, setPadding] = useState(1)
  const [margin, setMargin] = useState(1)
  const [showGridOverlay, setShowGridOverlay] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const link = document.createElement('link')
    link.href = `https://fonts.googleapis.com/css?family=${fontFamily.replace(' ', '+')}`
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [fontFamily])

  const generateLumosCode = () => {
    const css = `
      /* Lumos Framework Custom Code */
      :root {
        /* Typography */
        --font-family: ${fontFamily};
        --letter-spacing: ${letterSpacing}em;

        /* Colors */
        --color-brand: ${brandColor};
        --color-text: ${textColor};
        --color-background: ${backgroundColor};
        --color-light: ${lightColor};
        --color-dark: ${darkColor};

        /* Font Sizes */
        --font-size-display: ${displaySize}rem;
        --font-size-h1: ${h1Size}rem;
        --font-size-h2: ${h2Size}rem;
        --font-size-h3: ${h3Size}rem;
        --font-size-h4: ${h4Size}rem;
        --font-size-h5: ${h5Size}rem;
        --font-size-h6: ${h6Size}rem;
        --font-size-body: ${bodySize}rem;

        /* Spacing */
        --spacing-unit: ${spacing}rem;
        --padding-unit: ${padding}rem;
        --margin-unit: ${margin}rem;
      }

      body {
        font-family: var(--font-family);
        color: var(--color-text);
        background-color: var(--color-background);
        font-size: var(--font-size-body);
      }

      h1, h2, h3, h4, h5, h6 {
        letter-spacing: var(--letter-spacing);
        line-height: 1em;
        margin-bottom: var(--margin-unit);
      }

      .u-text-display { font-size: var(--font-size-display); }
      h1, .u-text-h1 { font-size: var(--font-size-h1); }
      h2, .u-text-h2 { font-size: var(--font-size-h2); }
      h3, .u-text-h3 { font-size: var(--font-size-h3); }
      h4, .u-text-h4 { font-size: var(--font-size-h4); }
      h5, .u-text-h5 { font-size: var(--font-size-h5); }
      h6, .u-text-h6 { font-size: var(--font-size-h6); }

      .u-button-primary {
        background-color: var(--color-brand);
        color: var(--color-background);
      }

      /* Spacing Utilities */
      .u-spacing { gap: var(--spacing-unit); }
      .u-padding { padding: var(--padding-unit); }
      .u-margin { margin: var(--margin-unit); }

      /* Dark Mode */
      .dark-mode {
        --color-text: var(--color-light);
        --color-background: var(--color-dark);
      }

      [data-theme="invert"] {
        filter: invert(1) hue-rotate(180deg);
      }
    `

    const blob = new Blob([css], { type: 'text/css;charset=utf-8' })
    saveAs(blob, 'lumos-custom-styles.css')
  }

  const renderPreview = (mode) => {
    const headingStyle = (size) => ({
      fontFamily,
      color: mode === 'dark' ? lightColor : textColor,
      letterSpacing: `${letterSpacing}em`,
      lineHeight: '1em',
      marginBottom: `${margin}rem`,
      padding: `${padding}rem`,
      border: '1px solid #ccc',
      backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'
    })

    const bgColor = mode === 'dark' ? darkColor : lightColor
    const txtColor = mode === 'dark' ? lightColor : textColor

    return (
      <div className="relative p-4 rounded-lg" style={{ backgroundColor: bgColor, color: txtColor, fontFamily }}>
        {showGridOverlay && (
          <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none">
            {Array(12).fill(0).map((_, i) => (
              <div key={i} className="h-full bg-blue-200 bg-opacity-20 flex items-end justify-center">
                <span className="text-xs text-blue-500">{i + 1}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ ...headingStyle(displaySize), fontSize: `${displaySize}rem` }}>Display Heading</div>
        <div style={{ ...headingStyle(h1Size), fontSize: `${h1Size}rem` }}>Heading 1</div>
        <div style={{ ...headingStyle(h2Size), fontSize: `${h2Size}rem` }}>Heading 2</div>
        <div style={{ ...headingStyle(h3Size), fontSize: `${h3Size}rem` }}>Heading 3</div>
        <div style={{ ...headingStyle(h4Size), fontSize: `${h4Size}rem` }}>Heading 4</div>
        <div style={{ ...headingStyle(h5Size), fontSize: `${h5Size}rem` }}>Heading 5</div>
        <div style={{ ...headingStyle(h6Size), fontSize: `${h6Size}rem` }}>Heading 6</div>
        <div style={{ display: 'flex', gap: `${spacing}rem` }}>
          <p className="mb-2" style={{ fontSize: `${bodySize}rem`, lineHeight: '1.5em', padding: `${padding}rem`, border: '1px solid #ccc', backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
            in eros elementum tristique. Duis cursus, mi quis viverra ornare
          </p>
          <Button variant="outline" style={{ backgroundColor: brandColor, color: mode === 'dark' ? darkColor : lightColor }}>
            Button Text
          </Button>
        </div>
      </div>
    )
  }

  const ExampleCard = ({ theme }) => (
    <Card className={theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} style={{ backgroundColor: theme === 'dark' ? darkColor : lightColor, color: theme === 'dark' ? lightColor : textColor }}>
      <CardHeader>
        <CardTitle style={{ fontSize: `${h2Size}rem`, marginBottom: `${margin}rem`, fontFamily, letterSpacing: `${letterSpacing}em` }}>Heading</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4" style={{ fontSize: `${bodySize}rem`, marginBottom: `${margin}rem`, fontFamily }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in
          eros elementum tristique.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" style={{ backgroundColor: brandColor, color: theme === 'dark' ? darkColor : lightColor, padding: `${padding}rem`, fontFamily }}>
            Button Text
          </Button>
          <Button variant="outline" style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: theme === 'dark' ? lightColor : textColor, padding: `${padding}rem`, fontFamily }}>
            Button Text
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const TypographySlider = ({ label, value, onChange, min, max, step }) => (
    <div className="flex flex-col space-y-2 mb-6">
      <Label>{label} <span className="text-sm text-gray-500">({value.toFixed(2)}rem)</span></Label>
      <Slider 
        value={[value]} 
        onValueChange={([newValue]) => onChange(newValue)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />
    </div>
  )

  return (
    <div className={`container mx-auto p-4 ${isDarkMode ? 'dark-mode' : ''}`} style={{ backgroundColor: isDarkMode ? darkColor : lightColor, color: isDarkMode ? lightColor : textColor }}>
      <h1 className="text-4xl font-bold mb-6">Lumos Style Guide Generator</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Light Theme Preview</h2>
            {renderPreview('light')}
            <div className="mt-4">
              <ExampleCard theme="light" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Dark Theme Preview</h2>
            {renderPreview('dark')}
            <div className="mt-4">
              <ExampleCard theme="dark" />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:sticky md:top-4 md:self-start">
          <Tabs defaultValue="typography" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="typography">Typography</TabsTrigger>
              <TabsTrigger value="color">Color</TabsTrigger>
              <TabsTrigger value="spacing">Spacing</TabsTrigger>
            </TabsList>
            <TabsContent value="typography">
              <Card>
                <CardHeader>
                  <CardTitle>Typography Settings</CardTitle>
                  <CardDescription>Adjust the font settings for your style guide.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-6">
                    <div className="flex flex-col space-y-1.5 mb-4">
                      <Label htmlFor="fontFamily">Font Family</Label>
                      <Select value={fontFamily} onValueChange={setFontFamily}>
                        <SelectTrigger id="fontFamily">
                          <SelectValue placeholder="Select a font" />
                        </SelectTrigger>
                        <SelectContent>
                          {googleFonts.map((font) => (
                            <SelectItem key={font} value={font}>{font}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <TypographySlider label="Display Size" value={displaySize} onChange={setDisplaySize} min={4} max={10} step={0.01} />
                    <TypographySlider label="H1 Size" value={h1Size} onChange={setH1Size} min={2} max={8} step={0.01} />
                    <TypographySlider label="H2 Size" value={h2Size} onChange={setH2Size} min={1.5} max={6} step={0.01} />
                    <TypographySlider label="H3 Size" value={h3Size} onChange={setH3Size} min={1} max={5} step={0.01} />
                    <TypographySlider label="H4 Size" value={h4Size} onChange={setH4Size} min={0.8} max={4} step={0.01} />
                    <TypographySlider label="H5 Size" value={h5Size} onChange={setH5Size} min={0.7} max={3} step={0.01} />
                    <TypographySlider label="H6 Size" value={h6Size} onChange={setH6Size} min={0.6} max={2} step={0.01} />
                    <TypographySlider label="Body Size" value={bodySize} onChange={setBodySize} min={0.8} max={2} step={0.01} />
                    <TypographySlider label="Letter Spacing" value={letterSpacing} onChange={setLetterSpacing} min={-0.1} max={0.1} step={0.001} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="color">
              <Card>
                <CardHeader>
                  <CardTitle>Color Settings</CardTitle>
                  <CardDescription>Customize the color scheme of your style guide.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-6">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="brandColor">Brand</Label>
                      <Input 
                        id="brandColor" 
                        type="color" 
                        value={brandColor} 
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="h-10 w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="textColor">Text</Label>
                      <Input 
                        id="textColor" 
                        type="color" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        className="h-10 w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="backgroundColor">Background Color</Label>
                      <Input 
                        id="backgroundColor" 
                        type="color" 
                        value={backgroundColor} 
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="h-10 w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lightColor">Light</Label>
                      <Input 
                        id="lightColor" 
                        type="color" 
                        value={lightColor} 
                        onChange={(e) => setLightColor(e.target.value)}
                        className="h-10 w-full"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="darkColor">Dark</Label>
                      <Input 
                        id="darkColor" 
                        type="color" 
                        value={darkColor} 
                        onChange={(e) => setDarkColor(e.target.value)}
                        className="h-10 w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="spacing">
              <Card>
                <CardHeader>
                  <CardTitle>Spacing Settings</CardTitle>
                  <CardDescription>Adjust the spacing, padding, and margin for your style guide.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid w-full items-center gap-6">
                    <TypographySlider label="Spacing" value={spacing} onChange={setSpacing} min={0} max={5} step={0.01} />
                    <TypographySlider label="Padding" value={padding} onChange={setPadding} min={0} max={5} step={0.01} />
                    <TypographySlider label="Margin" value={margin} onChange={setMargin} min={0} max={5} step={0.01} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div className="mt-6 space-y-4">
            <Button 
              onClick={generateLumosCode}
              className="w-full"
              style={{ backgroundColor: brandColor, color: isDarkMode ? darkColor : lightColor }}
              data-theme={isDarkMode ? "invert" : ""}
            >
              Export Code
            </Button>
            <div className="flex items-center justify-between">
              <Label htmlFor="grid-overlay">Show Grid Overlay</Label>
              <Switch
                id="grid-overlay"
                checked={showGridOverlay}
                onCheckedChange={setShowGridOverlay}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">☀️ / 🌑</Label>
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
