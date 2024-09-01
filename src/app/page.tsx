'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Heart, Repeat2, Home, Bell, Mail, User, Search, MoreHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
interface Comment {
  id: number
  author: string
  content: string
  avatar: string
}

interface Tweet {
  id: number
  author: string
  username: string
  content: string
  avatar: string
  comments: Comment[]
  retweets: number
  likes: number
  liked: boolean
  retweeted: boolean
}

export default function TwitterClone() {
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: 1,
      author: "John Doe",
      username: "johndoe",
      content: "¡Hola Twitter! Este es mi primer tweet.",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [
        {
          id: 1,
          author: "Jane Smith",
          content: "¡Bienvenido a Twitter!",
          avatar: "/placeholder.svg?height=30&width=30"
        }
      ],
      retweets: 0,
      likes: 0,
      liked: false,
      retweeted: true
    },
    {
      id: 2,
      author: "Jane Smith",
      username: "janesmith",
      content: "Quien no arriesga, no gana.",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [],
      retweets: 1,
      likes: 45,
      liked: true,
      retweeted: true
    },
    {
      id: 3,
      author: "Carmen Gonzales",
      username: "carmeng",
      content: "¡Hola Twitter! Empezaré la Facultad hoy!.",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [
        {
          id: 1,
          author: "Sarha Ro",
          content: "Mucha suerte!",
          avatar: "/placeholder.svg?height=30&width=30"
        }
      ],
      retweets: 16,
      likes: 55,
      liked: true,
      retweeted: false
    },
    {
      id: 4,
      author: "Paolo",
      username: "Paolo22",
      content: "giornata difficile:(",
      avatar: "/placeholder.svg?height=40&width=40",
      comments: [
        {
          id: 1,
          author: "Carla Disteffano",
          content: "¡domani andrà meglio",
          avatar: "/placeholder.svg?height=30&width=30"
        }
      ],
      retweets: 0,
      likes: 10,
      liked: true,
      retweeted: false
    },
  ])
  const [newTweet, setNewTweet] = useState("")
  const [commentDialogOpen, setCommentDialogOpen] = useState(false)
  const [currentTweetId, setCurrentTweetId] = useState<number | null>(null)
  const [newComment, setNewComment] = useState("")

  const handleNewTweet = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTweet.trim()) {
      const tweet: Tweet = {
        id: tweets.length + 1,
        author: "Usuario Actual",
        username: "usuario",
        content: newTweet,
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7443-removebg-preview-hCrfSnybZcURCujwD2VMdDz4j8s2iQ.png",
        comments: [],
        retweets: 0,
        likes: 0,
        liked: false,
        retweeted: false
      }
      setTweets([tweet, ...tweets])
      setNewTweet("")
    }
  }

  const handleComment = (id: number) => {
    setCurrentTweetId(id)
    setCommentDialogOpen(true)
  }

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() && currentTweetId) {
      setTweets(tweets.map(tweet => 
        tweet.id === currentTweetId 
          ? { ...tweet, comments: [...tweet.comments, { id: tweet.comments.length + 1, author: "Usuario Actual", content: newComment, avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_7443-removebg-preview-hCrfSnybZcURCujwD2VMdDz4j8s2iQ.png" }] } 
          : tweet
      ))
      setNewComment("")
    }
  }

  const handleRetweet = (id: number) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? { ...tweet, retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1, retweeted: !tweet.retweeted } : tweet
    ))
  }

  const handleLike = (id: number) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? { ...tweet, likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1, liked: !tweet.liked } : tweet
    ))
  }

  return (
    <div className="flex min-h-screen bg-black text-white mx-20">
      {/* Left Sidebar */}
      <div className="w-64 pt-2 ">
        <div className="mb-8">
        <Image
      src="/twitter-X-.jpeg"
      width={50}
      height={50}
      alt="Picture of the author"
    /><p>Por Alejandro Ponce</p>
        </div>
        <nav>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Home className="mr-2" /> Inicio
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Search className="mr-2" /> Explorar
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Bell className="mr-2" /> Notificaciones
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <Mail className="mr-2" /> Mensajes
          </Button>
          <Button variant="ghost" className="w-full justify-start mb-2">
            <User className="mr-2" /> Perfil
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <MoreHorizontal className="mr-2" /> Mas
          </Button>
        </nav>
        <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600">Postear</Button>
      </div>

      {/* Main Content */}
      <div className="flex-grow  border-gray-800 content-center">
        <div className="max-w-2xl mx-auto ">
        <nav aria-live="polite" role="navigation" className="content-center flex items-center justify-between p-2 -mt-7 border-b border-gray-800 py-9 border-r border-l">
          <div className="flex items-center ">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800" disabled>
              
            </Button>
            <Link href="/home" className="flex flex-col items-center px-12 ml-3 text-blue-400 border-b-2 border-blue-400">
              <span>Para ti</span>
            </Link>
            <Link href="/home" className="flex flex-col items-center px-12 py-2 text-gray-400 hover:bg-gray-800">
              <span>Siguiendo</span>
            </Link>
            <Link href="/home" className="flex flex-col items-center px-12 mr-10 text-gray-400 hover:bg-gray-800">
              <span>Web Developers</span>
            </Link>
          </div>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:bg-gray-800" disabled>
            
            
          </Button>
        </nav>
          
          <form onSubmit={handleNewTweet} className="mb-4">
            <div className="flex items-start space-x-2 border-gray-800 border-r border-l">
              <Avatar className="w-10 h-10 m-2">
                <Image
                  src="/logo.png"
                  alt="Your Avatar"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </Avatar>
              <div className="flex-grow ">
                <Input
                  type="text"
                  value={newTweet}
                  onChange={(e) => setNewTweet(e.target.value)}
                  placeholder="What's happening?"
                  className="bg-transparent border-none text-white placeholder-gray-500 mb-2"
                />
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Tweet</Button>
              </div>
            </div>
          </form>

          <div className="space-y-4">
            {tweets.map((tweet) => (
              <Card key={tweet.id} className="bg-black border-gray-800">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={tweet.avatar} alt={tweet.author} />
                      <AvatarFallback>{tweet.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{tweet.author}</p>
                      <p className="text-sm text-gray-500">@{tweet.username}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{tweet.content}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex space-x-4 text-gray-500">
                    <Dialog open={commentDialogOpen && currentTweetId === tweet.id} onOpenChange={(open) => {
                      setCommentDialogOpen(open)
                      if (!open) setCurrentTweetId(null)
                    }}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => handleComment(tweet.id)}>
                          <MessageCircle className="h-4 w-4 mr-2" />
                          {tweet.comments.length > 0 && tweet.comments.length}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] bg-black text-white">
                        <DialogHeader>
                          <DialogTitle>Comments</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4">
                          <ScrollArea className="h-[200px] w-full rounded-md border border-gray-800 p-4">
                            {tweet.comments.map((comment) => (
                              <div key={comment.id} className="mb-4 last:mb-0">
                                <div className="flex items-start space-x-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-semibold text-sm">{comment.author}</p>
                                    <p className="text-sm">{comment.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </ScrollArea>
                        </div>
                        <form onSubmit={submitComment} className="mt-4">
                          <Input
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            className="mb-2 bg-transparent text-white placeholder-gray-500"
                          />
                          <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Comment</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRetweet(tweet.id)}
                      className={tweet.retweeted ? "text-green-500" : ""}
                    >
                      <Repeat2 className="h-4 w-4 mr-2" />
                      {tweet.retweets > 0 && tweet.retweets}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(tweet.id)}
                      className={tweet.liked ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4 mr-2" fill={tweet.liked ? "currentColor" : "none"} />
                      {tweet.likes > 0 && tweet.likes}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-4">
        <div className="bg-gray-900 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Trends for you</h2>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-500">Trending in your area</p>
              <p className="font-semibold">#LocalTrend</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Politics · Trending</p>
              <p className="font-semibold">#PoliticalEvent</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Entertainment · Trending</p>
              <p className="font-semibold">#CelebrityNews</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 rounded-lg p-4">
          <h2 className="text-xl font-bold mb-2">Who to follow</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Suggested User" />
                  <AvatarFallback>SU</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Suggested User</p>
                  <p className="text-sm text-gray-500">@suggesteduser</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}