<template>
    <div class="navigation-section">
        <nav class="top_nav">
            <NuxtLink :to="{name: 'index'}">
          <div class="nav-title">MCX MMXXV</div>
        </NuxtLink>
          <ul class="nav-left">
            <a href=""><li class="nav-link">contact</li></a>
          </ul>
          <ul class="nav-center">
            <NuxtLink :to="{name: 'index'}"><li class="nav-logo">MCX</li></NuxtLink>
          </ul>
          <ul class="nav-right">
            <NuxtLink :to="{name: 'index'}"><li class="nav-link">home</li></NuxtLink>
            <!-- <NuxtLink href=""><li class="nav-link">about</li></NuxtLink> -->
            <!-- <NuxtLink href=""><li class="nav-link">service</li></NuxtLink> -->
            <!-- <NuxtLink href=""><li class="nav-link">cards</li></NuxtLink> -->
            <NuxtLink :to="{name: 'login'}"><li class="nav-link">vault</li></NuxtLink>
          </ul>
          <div class="end-nav">
          <button id="menu-btn"><img src="./assets/icons/bars.svg" alt="menu" class="mobile-icon"></button>
          <button id="cart-btn">
          <img src="./assets/icons/bag-shopping.svg" alt="cart" class="nav-link cart-button"></button>
          </div>
        </nav>
        <nav class="mobile_nav hide">
          <div class="top-section">
            <img style="width:200px; height:200px" src="./assets/images/brands/logo.svg" alt="" class="logo">
          </div>
          <div class="bottom-section">
            <ul>
              <NuxtLink :to="{name: 'index'}"><li class="nav-link">home</li></NuxtLink>
              <!-- <NuxtLink :to="{name: 'index'}"><li class="nav-link">about</li></NuxtLink> -->
            <!-- <a href=""><li class="nav-link">Contact</li></a> -->
            <!-- <a href=""><li class="nav-link">services</li></a> -->
            <!-- <a href=""><li class="nav-link">products</li></a> -->
            <NuxtLink :to="{name: 'login'}"><li class="nav-link">login</li></NuxtLink>
            
            </ul>
          </div>
        </nav>
        <nav class="mobile_cart hide">
          <div class="cart-top"><h1 class="cart-title">Your Cart</h1></div>
          
          <div class="cart-items-card">
            <div class="item-card">
              <img class="card-item" src="./assets/images/demo-card2.png" alt="item"/>
              <div class="item-info">
                <div class="item-left">
                  <div class="item-name">MCX Card</div>
                  <div class="item-quantity">
                    <button class="qty">+</button> <span>1</span>  <button class="qty">-</button></div>
                </div>
                <div class="item-right">
                  <div class="item-price">$49</div>
                </div>
                
              </div>
              
            </div>
            <div class="cart-end">
              <div class="total"><p>Total</p><p>$49</p></div>
              <button class="checkout">Checkout</button>
            </div>
          </div>
        </nav>
      </div>
    </template>