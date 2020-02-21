<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ApiResource(
 * normalizationContext={"groups"={"chairs"}}
 * )
 * @ORM\Entity(repositoryClass="App\Repository\ChairRepository")
 */
class Chair
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"chairs"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\RTable", inversedBy="chairs")
     * @Groups({"chairs"})
     */
    private $rtable;

    /**
     * @ORM\Column(type="string", length=4)
     * @Assert\Length(max=4)
     * @Groups({"chairs"})
     */
    private $macAddress;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getRtable(): ?RTable
    {
        return $this->rtable;
    }

    public function setRtable(?RTable $rtable): self
    {
        $this->rtable = $rtable;

        return $this;
    }

    public function getMacAddress(): ?string
    {
        return $this->macAddress;
    }

    public function setMacAddress(string $macAddress): self
    {
        $this->macAddress = $macAddress;

        return $this;
    }
}
