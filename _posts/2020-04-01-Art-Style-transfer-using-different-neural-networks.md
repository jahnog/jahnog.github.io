---
title: "Neural Art Style Transfer"
excerpt: "A tour of neural-network models that repaint photos in the style of famous artworks."
header:
  teaser: /assets/images/art.jpg
tags:
  - deep-learning
  - machine-learning
  - computer-vision
  - python
---

## Art Style transfer (A comparison between models)

> **TL;DR** — I built [artcopypaste.com](https://artcopypaste.com/), a web app that repaints your photos in the style of famous artworks. This write-up is a deep dive into the families of neural networks that make it work, with side-by-side results.
>
> **Stack** — Python, TensorFlow/Keras, PyTorch, Convolutional Neural Networks (VGG, ResNet, Inception)
>
> **Links** — [Live product: artcopypaste.com](https://artcopypaste.com/)

Art Style Transfer consists in the transformation of an image into a similar one that seems to have been painted by an artist.
If we are Vincent van Gogh fans, and we love German Shepherds, we may like to get a picture of our favorite dog painted in van Gogh’s Starry Night fashion.

![Art Styles](/assets/images/art.jpg)

* [Create your own artistic photos Here](https://artcopypaste.com/)

Introduction
============

![german shepherd](/assets/images/art-style-transfer/Sv-uTeNcf32eZ1s7UPvUUw.jpeg){: .centered-image}

Image by author

![van gogh starry night](/assets/images/art-style-transfer/6U_BQMRY5oeHvx6kfvu-BA.jpeg){: .centered-image}

_Starry Night by Vincent van Gogh,_ [_Public Domain_](https://commons.wikimedia.org/w/index.php?curid=10749998){: .centered-image}

The resulting picture can be something like this:

![german shepherd with a starry night style](/assets/images/art-style-transfer/ZpECAVBmJh8tkFLLIVOVtQ.jpeg){: .centered-image}

Image by author

Instead, if we like Katsushika Hokusai’s Great Wave off Kanagawa, we may obtain a picture like this one:

![the great wave](/assets/images/art-style-transfer/ZBo4y3HmRTYGrPgA--hwSA.jpeg){: .centered-image}

_The Great wave of Kanagawa by Katsushika Hokusai,_ [_Public Domain_](https://commons.wikimedia.org/wiki/File:Great_Wave_off_Kanagawa.jpg){: .centered-image}

![german shepherd with the great wave style](/assets/images/art-style-transfer/4La37aXKDP6CZkFzfEHDyQ.jpeg){: .centered-image}

Image by author

And something like the following picture, if we prefer Wassily Kandinsky’s Composition 7:

![wassily kandinsky composition 7](/assets/images/art-style-transfer/cmy7J38WC5jHi9nljX-bYg.jpeg){: .centered-image}

_Compositions 7 by Wassily Kandinsky,_ [_Public Domain_](https://commons.wikimedia.org/wiki/File:Vassily_Kandinsky,_1913_-_Composition_7.jpg){: .centered-image}

![german shepherd with composition 7 style](/assets/images/art-style-transfer/qiVeS8iEBobXWPT84fBa8w.jpeg){: .centered-image}

Image by author

These image transformations are possible thanks to advances in computing processing power that allowed the usage of more complex neural networks.

Before continuing, you may like to see how to implement a bare bones Neural Network using python without any complex framework [Clicking Here]({% post_url 2021-04-01-Artificial-Intelligence-Beginnings %})

The Convolutional Neural Networks (CNN), composed of a series of layers of convolutional matrix operations, are ideal for image analysis and object identification. They employ a similar concept to graphic filters and detectors used in applications like Gimp or Photoshop, but in a much more powerful and complex way.

A basic example of a matrix operation is performed by an edge detector. It takes a small picture sample of NxN pixels (5x5 in the following example), multiplies its values by a predefined NxN convolution matrix and obtains a value that indicates if an edge is present in that portion of the image. Repeating this procedure for all the NxN portions of the image, we can generate a new image where we have detected the borders of the objects present in there.

![condor photo plus edge detector equals condor borders](/assets/images/art-style-transfer/49nqOoWK4cAsuQMSm382wQ.png){: .centered-image}

Image by author

The two main features of CNNs are:

*   The numeric values of the convolutional matrices are not predefined to find specific image features like edges. Those values are automatically generated during the optimization processes, so they will be able to detect more complex features than borders.
*   They have a layered structure, so the first layers will detect simple image features (edges, color blocks, etc.) and the latest layers will use the information from the previous ones to detect complex objects like people, animals, cars, etc.

This is the typical structure of a Convolutional Neural Network:

![](/assets/images/art-style-transfer/3BRLw4lsANPEfGgimG3YVQ.png){: .centered-image}

Image by [Aphex34](https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Typical_cnn.png/512px-Typical_cnn.png){: .centered-image} / [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0)

Thanks to papers like _“Visualizing and Understanding Convolutional Networks”\[1\]_ by Matthew D. Zeiler, Rob Fergus and _“Feature Visualization”\[12\]_ by Chris Olah, Alexander Mordvintsev, Ludwig Schubert, we can visually understand what features are detected by the different CNN layers:

![](/assets/images/art-style-transfer/rYOXpsZAtGyYZX51kX5VcQ.jpeg){: .centered-image}

Image by Matthew D. Zeiler et al. _“Visualizing and Understanding Convolutional Networks”\[1\], usage authorized_

The first layers detect the most basic features of the image like edges.

![](/assets/images/art-style-transfer/ngJrXA4uJxr-tSiREZHRoA.jpeg){: .centered-image}

Image by Matthew D. Zeiler et al. _“Visualizing and Understanding Convolutional Networks”\[1\], usage authorized_

The next layers combine the information of the previous layer to detect more complex features like textures.

![](/assets/images/art-style-transfer/0o6odnoF4ap7hBoPwl7i0A.jpeg){: .centered-image}

Image by Matthew D. Zeiler et al. _“Visualizing and Understanding Convolutional Networks”\[1\], usage authorized_

Following layers, continue to use the previous information to detect features like repetitive patterns.

![](/assets/images/art-style-transfer/iGeYVLPZZYH8NIVYUtGjIQ.jpeg){: .centered-image}

Image by Matthew D. Zeiler et al. _“Visualizing and Understanding Convolutional Networks”\[1\], usage authorized_

The latest network layers are able to detect complex features like object parts.

![](/assets/images/art-style-transfer/LqatJHUMh1IQi3tat22s1w.jpeg){: .centered-image}

Image by Matthew D. Zeiler et al. _“Visualizing and Understanding Convolutional Networks”\[1\], usage authorized_

The final layers are capable of classifying complete objects present in the image.

The possibility of detecting complex image features is the key enabler to perform complex transformations to those features, but still perceiving the same content in the image.

Independent image optimization
==============================

One of the most important papers regarding Art Style Transfer is “_A Neural Algorithm of Artistic Style”_\[2\] by Leon A. Gatys, Alexander S. Ecker, Matthias Bethge.

Its main finding was that the **_Content_** of a natural image and its **_Style_** can be separated and processed independently of each other, which allows us to “extract” the style from a classic art paint and apply it to our own images.

Many of the other Neural Style Transfer models discussed here took this idea and expanded it with faster and more complex networks, but still using this foundation.

Gatys et al. model is based on a VGG-19\[3\] neural network, which is commonly used for visual object recognition and rivals human performance.

![vgg neural network](/assets/images/art-style-transfer/dd2M0dum748VtZnJwcmHLQ.png){: .centered-image}

Image by author

Then, it uses pieces of it to define some functions:

*   A **Content Loss** function, that calculates how the content of the generated image differs from the content of our original image. To compare the Content, instead of comparing the image pixels, it checks the values of one of the CNN highest layers of the **_Input Image_** and the values of that layer for the **_Output Image_**. This will allow us to generate different images that will contain similar objects in them.
*   A **Style Loss** function, that calculates how the style of the generated image differs from the style of the classic art paint (or whatever style image we choose to use). To compare Styles, a different approach is required. It takes layers at different levels (to compare features of different complexity) and for each layer, a matrix (Gram matrix) with the correlation between the detected features is created. This matrix indicates which features occur simultaneously (like finding that horizontal lines always have X color, etc). The Style Loss is calculated as the distance between the Gram matrices of the layers of the **_Style Image_** and the Gram matrices of the layers in the **_Output Image_**. This allows us to apply features from the simple ones, like blocks of some color, to the most complex ones like waves or the artist brushstroke.
*   A **Total Loss** function that takes into account both the Content Loss and the Style Loss.

![vgg19 style and content loss function](/assets/images/art-style-transfer/9mRwqQvc3pKAW1mpr-XEfQ.png){: .centered-image}

Image by author

Then it runs several optimization rounds (thousands or more) that will introduce changes in our working image that will decrease the Total Loss, thus producing a mix between our photo and the painting style.

All the previous German Shepherd artistic images were generated using this method.

You can also generate your own artistic pictures using this method going to the [artcopypaste.com](https://artcopypaste.com/) web site.

**_Advantages:_**

*   Works with arbitrary styles and images of any size (limited only by the GPU memory used in the process).
*   Does not require to pre-train the neural network (it uses the VGG19 ImageNet weights used for object detection).
*   There are examples available for the main deep learning frameworks: [PyTorch](https://pytorch.org/tutorials/advanced/neural_style_tutorial.html), [Tensorflow](https://www.tensorflow.org/tutorials/generative/style_transfer), [Keras](https://keras.io/examples/generative/neural_style_transfer/), etc.

**_Disadvantages:_**

*   It takes a long time to produce results, in the order of several minutes on a medium-range GPU.
*   It needs to store the VGG pre-trained weights data (550 MB).

Pre-trained networks for a single style transfer
================================================

These networks tackle the main disadvantage of models like the previously described have: The time it takes to produce an artistic image.

They are based on models like the one described in the paper _“Perceptual Losses for Real-Time Style Transfer and Super-Resolution”_\[4\] by Justin Johnson, Alexandre Alahi, Li Fei-Fei.

These models pre-train a CNN with a specific style, which can take a few hours in a GPU, and then these networks can be used to apply the selected style to any image nearly in real-time and also to apply styles to movies in a few minutes.

They are composed of two CNNs:

*   An optimizable **_Image Transformation Network_**, that takes the Original Image and generates the new Artistic Image, following the Encoder-Decoder design. An Image is first reduced to a set of high-level features that then can be expanded to recreate the image, but in this case, with an artistic style applied.
*   A fixed **_Loss Network_**, that’s used to measure the “Perception Loss”, or how the generated image differs from the original despite changing its style. This Loss is similar to _Gatys et al_\[2\] Total Loss function (Content Loss + Style Loss) but it’s calculated using a pre-trained VGG16\[3\] network instead of a VGG19 network.

![](/assets/images/art-style-transfer/szkOelXhXAy8vip-nW2Zzg.png){: .centered-image}

Image by author

The structure of the Image Transform Network is similar to:

![johnson image transform network](/assets/images/art-style-transfer/rCZQ5dI1RG_yuo0fIUbl3g.png){: .centered-image}

Image by author

*   The network structure follows the guidelines from _Radford et al\[5\]_
*   C1–3 are convolutions with a step 2 striding without pooling, to down-sample the image, and with Batch normalization and ReLU activation.
*   RN1–5 are ResNets\[6\] for high-level image features recognition. ResNets proved to be faster than VGG at image recognition problems.
*   C4–6 are convolutions with ½ striding without pooling, for image up-sampling, with Batch normalization and ReLU activation, except the last layer that uses Tanh activation to generate pixel values between 0 and 255.
*   Convolutions C1 and C6 use 9x9 kernels, C2–5 use 3x3 kernels.

This image down-sampling and up-sampling help detect higher-level features of the images. In a way, it works like a lossy compression but for image high-level features (not pixels or colors as in a JPEG image).

Using the same images and styles as before, it will produce the following results:

![german shepherd with starry night style using johnson model](/assets/images/art-style-transfer/4eadjoYOql8H4tG_JycDbA.jpeg){: .centered-image}

Image by author, starry night style

![german shepherd with great wave style using johnson model](/assets/images/art-style-transfer/QhWLhF-KXqJh_XOl9_AOpg.jpeg){: .centered-image}

Image by author, great wave style

![german shepherd with composition 7 style using johnson model](/assets/images/art-style-transfer/FGaTyreSQQsmSf1XnD4wkw.jpeg){: .centered-image}

Image by author, composition 7 style

**_Advantages:_**

*   Once trained, the Image Transform Network is really fast applying the style for which it was trained to any type of original image. It works in the order of tens of seconds in a mid-range GPU.

**_Disadvantages:_**

*   It takes much more time to train as it needs to train the network against an image dataset.
*   Not only it needs the weights data for the VGG (550 MB), but also needs the image dataset for training (for example, the COCO 2014 dataset that contains 82,700 images and needs 13.7 GB of storage)

Pre-trained networks for arbitrary style transfer
=================================================

These networks also generate a pre-trained model, but not limited to only one style, this model aims to be able to reproduce any style present in the style image.

One way to create this type of network model is described in the paper _“Exploring the structure of a real-time, arbitrary neural artistic stylization network”_\[7\] by Golnaz Ghiasi, Honglak Lee, Manjunath Kudlur, Vincent Dumoulin, Jonathon Shlens.

Another very similar model, is described in _“Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization”\[8\]_ by Xun Huang, Serge Belongie.

This model consists of three Neural Networks:

*   A **_Style Transfer Network_** (similar to _Johnson et al\[4\]_ Image Transfer Network)
*   A **_Loss Network_** (similar to _Johnson et al._ VGG16\[3\])
*   And adds a **_Style Prediction Network_** (Inception V3\[9\]).

![style transfer and style prediction neural networks](/assets/images/art-style-transfer/C0IHfHFHVJAcceKTIlTztw.png){: .centered-image}

Image by author

_Golnaz Ghiasi et al._\[7\] paper expands the initial work described in “A Learned Representation For Artistic Style”\[10\] by Vincent Dumoulin, Jonathon Shlens, Manjunath Kudlur, which implemented a model similar to _Johnson et al_\[4\], but by manipulating the normalization parameters of the Style Transform Network it was capable of applying 32 painting styles to the images.

Thanks to the addition of the **_Style Prediction Network_**, the model is able to apply any number of styles, even styles for which it was not trained. This network produces a vector of normalization parameters **S** that represents the detected Style present in the Style Image and applies them to the Style Transfer network to generate the Artwork.

To train this model, not only requires a large image dataset to use as content for training Style Transfer Network (in this case, the ImageNet dataset consisting of 14 million images) but also a large style image dataset to train the Style Prediction Network (in this case the Painter by Numbers dataset, consisting of 80.000 art paintings and the Describable Textures dataset, composed of 5600 textures).

Fortunately, there are pre-trained models readily available that can be used directly:

*   A first version, available in Tensorflow Hub with only 39 MB in weights data size, and can produce the following images: [https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/1](https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/1)

![german shepherd with starry night style](/assets/images/art-style-transfer/4cTHFL8PMqoZiqXUH-G9bA.jpeg){: .centered-image}

Image by author, starry night style

![german shepherd with the great wave off kanagawa style](/assets/images/art-style-transfer/XUeXcw1wpvggZZ85EeMqlA.jpeg){: .centered-image}

Image by author, great wave style

![german shepherd with kandinsky composition 7 style](/assets/images/art-style-transfer/NxZvzTytoPSdXs6TAArBAA.jpeg){: .centered-image}

Image by author, composition 7 style

*   A Second updated version, of 82 MB in size, also available in Tensorflow Hub: [https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2](https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2)

![german shepherd with van gogh starry night style](/assets/images/art-style-transfer/ocLbirZLarz4kRHE-BcfcA.jpeg){: .centered-image}

Image by author, starry night style

![german shepherd with hokusai great wave off kanagawa style](/assets/images/art-style-transfer/hcSbDpASMT65ADA1t_Dzyg.jpeg){: .centered-image}

Image by author, great wave style

![german shepherd with kandinsky composition 7 style](/assets/images/art-style-transfer/YEPQp-B-1XDh6jd-pzeU4w.jpeg){: .centered-image}

Image by author, composition 7 style

You can also test your own images with this model in the [artcopypaste.com](https://artcopypaste.com/) web site.

**_Advantages:_**

*   This model is very fast. With the pre-trained model just with 1 pass through the Style Transfer Network and the Style Prediction Network, it produces the artistic image output.

**_Disadvantages:_**

*   It needs a large image dataset and time to train. But fortunately, pre-trained models are available and ready to use.
*   They do not generate results with the same high details as _Gatys et al\[2\]_ or _Johnson et al\[4\]_ due to the limited resolution of the styles used for training, but they still are very pleasant results.

Universal style transfer with Encoder-Decoder networks
======================================================

This model is detailed in the paper _“Universal Style Transfer via Feature Transforms”_\[11\] by Yijun Li, Chen Fang, Jimei Yang, Zhaowen Wang, Xin Lu, Ming-Hsuan Yang

It tries to discard the need to train the network on the style images while still maintaining visual appealing transformed images.

It first trains a series of Decoder networks that connect to the different layers of a VGG network. The VGG network acts as an encoder. It is loaded with the ImageNet weights and fixed. Each decoder structure has the inverse structure of the VGG up to the point where the decoder connects to the encoder.

Using an image dataset, the decoders are trained to regenerate the original image feed to the VGG. And once they have been trained, their weights are fixed for the rest of the process.

![VGG19 network as encoder, with one decoder for each layer](/assets/images/art-style-transfer/SfKi42o9wsxsymPS1Z92zw.png){: .centered-image}

Image by author

This produces a set of Encoders-Decoders that translate the original image to features with different levels of complexity, but that is capable of reconstructing the original image, either performing a single level transformation or, for better generation quality, a multi-level transformation.

For single-level transformation:

1.  Both the Content and Style images are encoded through the VGG.
2.  The features of both images are extracted from a specific layer.
3.  Then, a Whitening and Coloring transformation is applied to those features.
4.  The result of the WCT then is fed to the corresponding Decoder network to generate the stylized image.

![whitening and coloring transform WCT](/assets/images/art-style-transfer/qeGYKTv1uQrPnmeHtBAu_g.png){: .centered-image}

Image by author

In practice, the whitening process helps capture content features present in the content and style images. And the coloring process, on the other hand, helps capture style features. Finally, the process blends the content and style features given specified relative weights to each one. This blend is what is then fed to the Decoder to continue the process.

For a multi-level optimization:

1.  The original image and the style image are fed to the VGG.
2.  The features of both images are extracted from the fifth layer.
3.  The whitening and coloring transformations are performed in the features and then fed to the fifth Decoder.
4.  The output of that decoder is then fed, along with the style image, again into the VGG.
5.  Then we take the features of both images, this time, from the fourth layer.
6.  The features are processed with the whitening and coloring transformations and then fed to the fourth Decoder.
7.  Similarly, these steps are repeated until we get a generated image from the first Decoder.
8.  This generated image is our final artistic image.

![real time art style transfer using multiple encoder-decoder networks](/assets/images/art-style-transfer/Zlv8y5xFmGL0r-UV15WhiA.png){: .centered-image}

Image by author

Some examples of this model are the following:

![german shepherd with van gogh starry night style](/assets/images/art-style-transfer/c8bzl6iKlSb4Ds_q8GJgow.jpeg){: .centered-image}

Image by author, starry night style

![german shepherd with hokusai great wave off kanagawa style](/assets/images/art-style-transfer/s68jmVuXf0Q5PA6Sxh68gw.jpeg){: .centered-image}

Image by author, great wave style

![german shepherd with kandinsky composition 7 style](/assets/images/art-style-transfer/jbaUwt6AtFg5oRNTRY3NzA.jpeg){: .centered-image}

Image by author, composition 7 style

**_Advantages:_**

*   This model is fast. With the five passes (one through each encoder-decoder) it produces the artistic image output.

**_Disadvantages:_**

*   It needs large image datasets and time to train each of the five decoder networks, but this is needed just only one time, but the paper even includes pre-trained weights in the code samples.

Final Thoughts
==============

This work is far from describing all the existing neural network models to perform the fascinating process of art style transfer, that is in constant evolution.

The best example is Gatys et al. separation between the Content and the Style of an image, that was taken and expanded by almost all other models.

I also just wanted to show, using a few examples, how we can get a deeper understanding of what we consider an object in an image, despite all the possible transformations in color and form it can suffer, and get a better idea how we perceive the world we see around us.

Other related stories: [Artificial Intelligence Beginnings (Build a Neural Network from scratch in Python)]({% post_url 2021-04-01-Artificial-Intelligence-Beginnings %})

**References**
==============

1: Matthew D. Zeiler, Rob Fergus, “Visualizing and Understanding Convolutional Networks” (2013), [https://arxiv.org/abs/1311.2901](https://arxiv.org/abs/1311.2901)

2: Leon A. Gatys, Alexander S. Ecker, Matthias Bethge, “A Neural Algorithm of Artistic Style” (2015), [https://arxiv.org/abs/1508.06576](https://arxiv.org/abs/1508.06576)

3: Karen Simonyan, Andrew Zisserman, “Very Deep Convolutional Networks for Large-Scale Image Recognition” (2014), [https://arxiv.org/abs/1409.1556](https://arxiv.org/abs/1409.1556)

4: Justin Johnson, Alexandre Alahi, Li Fei-Fei, “Perceptual Losses for Real-Time Style Transfer and Super-Resolution” (2016), [https://arxiv.org/abs/1603.08155](https://arxiv.org/abs/1603.08155)

5: Alec Radford, Luke Metz, Soumith Chintala, “Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks” (2015), [https://arxiv.org/abs/1511.06434](https://arxiv.org/abs/1511.06434)

6: Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun, “Deep Residual Learning for Image Recognition” (2015), [https://arxiv.org/abs/1512.03385](https://arxiv.org/abs/1512.03385)

7: Golnaz Ghiasi, Honglak Lee, Manjunath Kudlur, Vincent Dumoulin, Jonathon Shlens, “Exploring the structure of a real-time, arbitrary neural artistic stylization network” (2017), [https://arxiv.org/abs/1705.06830](https://arxiv.org/abs/1705.06830)

8: Xun Huang, Serge Belongie, “Arbitrary Style Transfer in Real-time with Adaptive Instance Normalization” (2017), [https://arxiv.org/abs/1703.06868](https://arxiv.org/abs/1703.06868)

9: Christian Szegedy, Vincent Vanhoucke, Sergey Ioffe, Jonathon Shlens, Zbigniew Wojna, “Rethinking the Inception Architecture for Computer Vision” (2015), [https://arxiv.org/abs/1512.00567](https://arxiv.org/abs/1512.00567)

10: Vincent Dumoulin, Jonathon Shlens, Manjunath Kudlur, “A Learned Representation For Artistic Style” (2016), [https://arxiv.org/abs/1610.07629](https://arxiv.org/abs/1610.07629)

11: Yijun Li, Chen Fang, Jimei Yang, Zhaowen Wang, Xin Lu, Ming-Hsuan Yang, “Universal Style Transfer via Feature Transforms” (2017), [https://arxiv.org/abs/1705.08086](https://arxiv.org/abs/1705.08086)

12: Chris Olah, Alexander Mordvintsev, Ludwig Schubert, “Feature Visualization” (2017), [https://distill.pub/2017/feature-visualization/](https://distill.pub/2017/feature-visualization/)

